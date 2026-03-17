const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');
const connectDB = require('../config/db');

connectDB();

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/perfume-store/products`;

const imageMapping = [
  { sku: "CS-MEN-001", url: `${CLOUDINARY_BASE}/CS-MEN-001.jpg` },
  { sku: "CS-WOM-001", url: `${CLOUDINARY_BASE}/CS-WOM-001.jpg` },
  { sku: "CS-MEN-002", url: `${CLOUDINARY_BASE}/CS-MEN-002.jpg` },
  { sku: "CS-WOM-002", url: `${CLOUDINARY_BASE}/CS-WOM-002.jpg` },
  { sku: "CS-MEN-003", url: `${CLOUDINARY_BASE}/CS-MEN-003.jpg` },
  { sku: "CS-WOM-003", url: `${CLOUDINARY_BASE}/CS-WOM-003.jpg` },
  { sku: "CS-WOM-004", url: `${CLOUDINARY_BASE}/CS-WOM-004.jpg` },
  { sku: "CS-UNI-001", url: `${CLOUDINARY_BASE}/CS-UNI-001.jpg` },
  { sku: "CS-UNI-002", url: `${CLOUDINARY_BASE}/CS-UNI-002.jpg` },
  { sku: "CS-UNI-003", url: `${CLOUDINARY_BASE}/CS-UNI-003.webp` },
  { sku: "CS-MEN-004", url: `${CLOUDINARY_BASE}/CS-MEN-004.jpg` },
  { sku: "CS-WOM-005", url: `${CLOUDINARY_BASE}/CS-WOM-005.jpg` },
  { sku: "CS-KID-001", url: `${CLOUDINARY_BASE}/CS-KID-001.jpg` },
  { sku: "CS-KID-002", url: `${CLOUDINARY_BASE}/CS-KID-002.avif` },
  { sku: "CS-KID-003", url: `${CLOUDINARY_BASE}/CS-KID-003.jpg` }
];

async function updateProducts() {
  try {
    console.log('Starting product image update...\n');
    
    for (const mapping of imageMapping) {
      const product = await Product.findOne({ sku: mapping.sku });
      
      if (product) {
        product.imageUrl = mapping.url;
        product.imagePublicId = `perfume-store/products/${mapping.sku}`;
        await product.save();
        console.log(`✅ Updated: ${product.name} (${mapping.sku})`);
      } else {
        console.log(`❌ Product not found: ${mapping.sku}`);
      }
    }
    
    console.log('\n✅ Database update complete!');
    
    // Verify the updates
    const products = await Product.find({});
    console.log(`\n📊 Total products in database: ${products.length}`);
    console.log('First product:', products[0]?.name, products[0]?.imageUrl);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

updateProducts();