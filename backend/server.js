const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// For Vercel, you CANNOT serve static files directly
// Instead, use a cloud storage solution (recommended)

// Option 1: Use a cloud storage URL (RECOMMENDED)
// Store full URLs in your database instead of relative paths
// Example: "https://res.cloudinary.com/your-cloud/image/upload/v123/dior-sauvage.jpg"

// Option 2: If you MUST serve local images for development only
if (process.env.NODE_ENV !== 'production') {
  app.use('/images', express.static(path.join(__dirname, 'public/images')));
  
  // Image fallback for development
  app.get('/images/:filename', (req, res, next) => {
    const imagePath = path.join(__dirname, 'public/images', req.params.filename);
    res.sendFile(imagePath, err => {
      if (err) {
        // Serve placeholder if image not found
        res.sendFile(path.join(__dirname, 'public/images/placeholder.jpg'));
      }
    });
  });
}

// Routes
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes); 

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// ❌ REMOVE this for Vercel:
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {...})

// ✅ EXPORT for Vercel:
module.exports = app;