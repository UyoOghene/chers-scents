const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

// Configure Cloudinary - use correct variable names
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Log config (remove in production)
console.log('✅ Cloudinary configured for:', process.env.CLOUDINARY_CLOUD_NAME);

module.exports = cloudinary;