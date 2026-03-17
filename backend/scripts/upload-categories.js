// scripts/upload-categories.js
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('📸 Cloudinary Config:');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');
console.log('');

const categoryImages = [
  {
    name: 'women-collection',
    url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800'
  },
  {
    name: 'men-collection',
    url: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800'
  },
  {
    name: 'unisex-collection',
    url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800'
  }
];

const uploadCategories = async () => {
  console.log('🚀 Uploading category images...\n');

  // Test Cloudinary connection first
  try {
    await cloudinary.api.ping();
    console.log('✅ Cloudinary connected successfully!\n');
  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error.message);
    console.log('Please check your Cloudinary credentials in the .env file');
    return;
  }

  for (const image of categoryImages) {
    try {
      console.log(`Uploading: ${image.name}...`);
      
      const result = await cloudinary.uploader.upload(image.url, {
        folder: 'perfume-store/categories',
        public_id: image.name,
        overwrite: true,
        transformation: [
          { width: 800, height: 600, crop: 'fill' },
          { quality: 'auto' }
        ]
      });

      console.log(`✅ Uploaded: ${result.secure_url}`);
      console.log(`   Public ID: ${result.public_id}\n`);
    } catch (error) {
      console.error(`❌ Failed to upload ${image.name}:`, error.message);
    }
  }

  console.log('🎉 Category uploads completed!');
  console.log('\nYou can now use these URLs in your frontend:');
  console.log('Women: https://res.cloudinary.com/dk0e6pgpj/image/upload/v1/perfume-store/categories/women-collection');
  console.log('Men: https://res.cloudinary.com/dk0e6pgpj/image/upload/v1/perfume-store/categories/men-collection');
  console.log('Unisex: https://res.cloudinary.com/dk0e6pgpj/image/upload/v1/perfume-store/categories/unisex-collection');
};

uploadCategories();