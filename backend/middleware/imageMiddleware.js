const path = require('path');
const fs = require('fs');

// Generate a simple SVG placeholder based on product name
const generatePlaceholderSVG = (productName, brand, category) => {
  const colors = {
    men: '#3b82f6',    // blue
    women: '#ec4899',  // pink
    unisex: '#8b5cf6', // purple
    kids: '#f59e0b'    // orange
  };
  
  const bgColor = colors[category] || '#e37380';
  
  return `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="${bgColor}" />
      <rect width="400" height="400" fill="url(#pattern)" />
      <defs>
        <pattern id="pattern" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
          <rect width="20" height="40" fill="rgba(255,255,255,0.1)" />
        </pattern>
      </defs>
      <text x="200" y="180" font-family="Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">
        ${productName || 'Perfume'}
      </text>
      <text x="200" y="220" font-family="Arial" font-size="18" fill="white" text-anchor="middle" opacity="0.9">
        ${brand || 'Luxury Fragrance'}
      </text>
      <text x="200" y="260" font-family="Arial" font-size="16" fill="white" text-anchor="middle" opacity="0.8">
        ${category || 'Premium'} Collection
      </text>
    </svg>
  `;
};

// Middleware to handle image requests
const serveImage = (req, res, next) => {
  const imagePath = path.join(__dirname, '../public/images', req.params.filename);
  
  // Check if file exists
  if (fs.existsSync(imagePath)) {
    return res.sendFile(imagePath);
  }
  
  // If image doesn't exist, generate a placeholder
  const productInfo = req.params.filename.replace('.jpg', '').replace('.png', '').split('_');
  const productName = productInfo[0] || 'Chers-Scents';
  const brand = productInfo[1] || 'Luxury';
  const category = productInfo[2] || 'unisex';
  
  const svg = generatePlaceholderSVG(productName, brand, category);
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
};

module.exports = { serveImage };