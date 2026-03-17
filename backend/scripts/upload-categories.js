// scripts/upload-categories.js
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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

  for (const image of categoryImages) {
    try {
      console.log(`Uploading: ${image.name}...`);
      
      const result = await cloudinary.uploader.upload(image.url, {
        folder: 'perfume-store/categories',
        public_id: image.name,
        overwrite: true
      });

      console.log(`✅ Uploaded: ${result.secure_url}\n`);
    } catch (error) {
      console.error(`❌ Failed to upload ${image.name}:`, error.message);
    }
  }

  console.log('🎉 Category uploads completed!');
};

uploadCategories();