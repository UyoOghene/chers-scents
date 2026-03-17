const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('🚀 Starting migration with fixed Cloudinary config...\n');

// Import dependencies
const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');
const connectDB = require('../config/db');

// Configure Cloudinary directly
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('📊 Cloudinary Config:');
console.log('Cloud Name:', cloudinary.config().cloud_name);
console.log('API Key:', cloudinary.config().api_key ? '✅ Set' : '❌ Missing');
console.log('API Secret:', cloudinary.config().api_secret ? '✅ Set' : '❌ Missing');
console.log('');

// Connect to MongoDB
connectDB();

// Image mapping
const imageMapping = [
  { sku: "CS-MEN-001", name: "Bleu de Chanel", filename: "bluedechanel2.jpg", category: "men" },
  { sku: "CS-WOM-001", name: "La Vie Est Belle", filename: "lancomelavie.jpg", category: "women" },
  { sku: "CS-MEN-002", name: "Sauvage", filename: "dior sauvage.jpg", category: "men" },
  { sku: "CS-WOM-002", name: "Flowerbomb", filename: "flowebomb.jpg", category: "women" },
  { sku: "CS-MEN-003", name: "Acqua di Gio", filename: "acquadigio.jpg", category: "men" },
  { sku: "CS-WOM-003", name: "Coco Mademoiselle", filename: "cocomademoiselle.jpg", category: "women" },
  { sku: "CS-WOM-004", name: "Black Opium", filename: "blackopium.jpg", category: "women" },
  { sku: "CS-UNI-001", name: "Baccarat Rouge 540", filename: "baracatrougen.jpg", category: "unisex" },
  { sku: "CS-UNI-002", name: "CK One", filename: "ckone.jpg", category: "unisex" },
  { sku: "CS-UNI-003", name: "Tom Ford Oud Wood", filename: "tomfordoudwood2.webp", category: "unisex" },
  { sku: "CS-MEN-004", name: "Aventus", filename: "creedaventus.jpg", category: "men" },
  { sku: "CS-WOM-005", name: "Fantasy", filename: "Fantasy-by-Britney-spears.jpg", category: "women" },
  { sku: "CS-KID-001", name: "Baby Touch", filename: "burberrybaby.jpg", category: "kids" },
  { sku: "CS-KID-002", name: "Tartine et Chocolat", filename: "tartineetchocolat.avif", category: "kids" },
  { sku: "CS-KID-003", name: "Petit Bateau Eau Fraîche", filename: "petitbateau.jpg", category: "kids" }
];

const findImageFile = (filename) => {
  // Clean filename (remove any URL encoding)
  const cleanFilename = decodeURIComponent(filename);
  
  const possiblePaths = [
    path.join(__dirname, '../public/images', cleanFilename),
    path.join(__dirname, '../public/images', cleanFilename.replace(/\s+/g, '_')),
    path.join(__dirname, '../public/images', cleanFilename.replace(/\s+/g, '-')),
    path.join(process.cwd(), 'public/images', cleanFilename),
    path.join(__dirname, '../images', cleanFilename)
  ];
  
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  
  // Try case-insensitive search
  const imagesDir = path.join(__dirname, '../public/images');
  if (fs.existsSync(imagesDir)) {
    const files = fs.readdirSync(imagesDir);
    const found = files.find(f => 
      f.toLowerCase() === cleanFilename.toLowerCase() ||
      f.toLowerCase().replace(/\s+/g, '') === cleanFilename.toLowerCase().replace(/\s+/g, '')
    );
    if (found) {
      return path.join(imagesDir, found);
    }
  }
  
  return null;
};

const uploadImageToCloudinary = async (filePath, product) => {
  try {
    console.log(`   📤 Uploading: ${path.basename(filePath)}...`);
    
    // Create a clean public ID
    const publicId = `${product.sku}-${product.name.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')}`;
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `perfume-store/${product.category}`,
      public_id: publicId,
      overwrite: true,
      transformation: [
        { width: 800, height: 800, crop: 'limit' },
        { quality: 'auto' }
      ]
    });
    
    console.log(`   ✅ Uploaded: ${result.secure_url}`);
    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error(`   ❌ Upload error:`, error.message);
    return null;
  }
};

const migrateImages = async () => {
  try {
    // Test Cloudinary connection first
    console.log('🔄 Testing Cloudinary connection...');
    await cloudinary.api.ping();
    console.log('✅ Cloudinary connected successfully!\n');
    
    const products = await Product.find({});
    console.log(`📊 Found ${products.length} products in database\n`);
    
    let successCount = 0;
    let failCount = 0;
    let notFoundCount = 0;
    
    for (const product of products) {
      console.log(`\n🔍 Processing: ${product.name} (${product.sku})`);
      
      const imageInfo = imageMapping.find(img => img.sku === product.sku);
      if (!imageInfo) {
        console.log(`   ⚠️ No image info found`);
        failCount++;
        continue;
      }
      
      console.log(`   Looking for: ${imageInfo.filename}`);
      
      const filePath = findImageFile(imageInfo.filename);
      
      if (!filePath) {
        console.log(`   ❌ Image file not found: ${imageInfo.filename}`);
        
        // List available files for debugging
        const imagesDir = path.join(__dirname, '../public/images');
        if (fs.existsSync(imagesDir)) {
          const files = fs.readdirSync(imagesDir);
          console.log(`   📁 Files in public/images:`);
          files.slice(0, 5).forEach(f => console.log(`      - ${f}`));
        }
        
        notFoundCount++;
        failCount++;
        continue;
      }
      
      const uploadResult = await uploadImageToCloudinary(filePath, product);
      
      if (uploadResult) {
        product.imageUrl = uploadResult.url;
        product.imagePublicId = uploadResult.publicId;
        await product.save();
        console.log(`   ✅ Database updated for ${product.name}`);
        successCount++;
      } else {
        failCount++;
      }
      
      // Delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully migrated: ${successCount} products`);
    console.log(`❌ Images not found: ${notFoundCount} products`);
    console.log(`❌ Upload failed: ${failCount - notFoundCount} products`);
    console.log(`📦 Total processed: ${products.length} products`);
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    process.exit();
  }
};

// Run migration
migrateImages();