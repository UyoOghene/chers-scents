const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../.env') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Map of your images (update paths to where your images actually are)
const images = [
  { filename: 'bluedechanel2.jpg', sku: 'CS-MEN-001' },
  { filename: 'lancomelavie.jpg', sku: 'CS-WOM-001' },
  { filename: 'dior sauvage.jpg', sku: 'CS-MEN-002' },
  { filename: 'flowebomb.jpg', sku: 'CS-WOM-002' },
  { filename: 'acquadigio.jpg', sku: 'CS-MEN-003' },
  { filename: 'cocomademoiselle.jpg', sku: 'CS-WOM-003' },
  { filename: 'blackopium.jpg', sku: 'CS-WOM-004' },
  { filename: 'baracatrougen.jpg', sku: 'CS-UNI-001' },
  { filename: 'ckone.jpg', sku: 'CS-UNI-002' },
  { filename: 'tomfordoudwood2.webp', sku: 'CS-UNI-003' },
  { filename: 'creedaventus.jpg', sku: 'CS-MEN-004' },
  { filename: 'Fantasy-by-Britney-spears.jpg', sku: 'CS-WOM-005' },
  { filename: 'burberrybaby.jpg', sku: 'CS-KID-001' },
  { filename: 'tartineetchocolat.avif', sku: 'CS-KID-002' },
  { filename: 'petitbateau.jpg', sku: 'CS-KID-003' }
];

async function uploadImages() {
  console.log('Starting image upload to Cloudinary...\n');
  
  // First, check if images exist
  const imagesDir = path.join(__dirname, '../public/images');
  console.log(`Looking for images in: ${imagesDir}\n`);
  
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Images directory not found!');
    console.log('Please create the directory and add your images:');
    console.log(imagesDir);
    return;
  }

  const availableFiles = fs.readdirSync(imagesDir);
  console.log(`Found ${availableFiles.length} files in directory\n`);

  for (const image of images) {
    try {
      // Find the actual file (case insensitive)
      const actualFile = availableFiles.find(f => 
        f.toLowerCase() === image.filename.toLowerCase()
      );
      
      if (!actualFile) {
        console.log(`❌ Image not found: ${image.filename}`);
        continue;
      }

      const filePath = path.join(imagesDir, actualFile);
      console.log(`Uploading: ${actualFile}...`);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'perfume-store/products',
        public_id: image.sku,
        overwrite: true,
        transformation: [
          { width: 800, height: 800, crop: 'limit' },
          { quality: 'auto' }
        ]
      });

      console.log(`✅ Uploaded: ${result.secure_url}`);
      console.log(`   Public ID: ${result.public_id}\n`);
      
    } catch (error) {
      console.error(`❌ Error uploading ${image.filename}:`, error.message);
    }
  }

  console.log('\n✅ Image upload complete!');
  console.log('\nNow run the migration script to update the database:');
  console.log('node scripts/migrate-images-fixed.js');
}

uploadImages();