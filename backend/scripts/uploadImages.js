const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

const uploadImages = async () => {
  const imagesDir = path.join(__dirname, '../public/images');
  
  try {
    // Check if directory exists
    if (!fs.existsSync(imagesDir)) {
      console.log('❌ Images directory not found:', imagesDir);
      return;
    }

    const files = fs.readdirSync(imagesDir);
    console.log(`📸 Found ${files.length} images to upload...\n`);

    for (const file of files) {
      try {
        const filePath = path.join(imagesDir, file);
        
        // Skip if it's a directory
        if (fs.statSync(filePath).isDirectory()) continue;

        console.log(`Uploading: ${file}...`);
        
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'perfume-store',
          public_id: path.parse(file).name,
          overwrite: true
        });

        console.log(`✅ Uploaded: ${file} -> ${result.secure_url}\n`);
      } catch (err) {
        console.log(`❌ Failed to upload ${file}:`, err.message);
      }
    }

    console.log('🎉 All uploads completed!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

uploadImages();