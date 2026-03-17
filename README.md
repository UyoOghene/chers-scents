# Chers Scents - Luxury Fragrance E-Commerce Platform

https://chersscents.vercel.app/

## 📋 Overview

Chers Scents is a full-stack e-commerce platform specialized in luxury perfumes and fragrances. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and integrated with Cloudinary for image management, it offers a seamless shopping experience for fragrance enthusiasts.

Key Features

- **Responsive Design** - Fully responsive UI that works on desktop, tablet, and mobile
- **Product Catalog** - Browse through categorized collections (Men, Women, Unisex, Kids)
- **Advanced Filtering** - Filter products by category, brand, price range
- **Search Functionality** - Search products by name or description
- **Shopping Cart** - Add/remove items, update quantities
- **Featured Products** - Showcase highlighted products on homepage
- **Cloudinary Integration** - Optimized image delivery with automatic format conversion
- **RESTful API** - Well-structured backend API

 Live Demo

- **Frontend**: [https://chersscents.vercel.app](https://chersscents.vercel.app)
- **Backend API**: [https://chers-scents-backend.vercel.app](https://chers-scents-backend.vercel.app)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Navigation and routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Styling and responsive design
- **Framer Motion** - Animations
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Cloudinary** - Image storage and optimization
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

### Clone the Repository
```bash
git clone https://github.com/yourusername/chers-scents.git
cd chers-scents
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root:
```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend root:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

4. Start the frontend development server:
```bash
npm run dev
```

## 📁 Project Structure

```
chers-scents/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   └── productController.js
│   ├── middleware/
│   │   └── imageMiddleware.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── uploadRoutes.js
│   ├── scripts/
│   │   ├── migrate-images.js
│   │   ├── seed.js
│   │   └── upload-categories.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── contexts/
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Products.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product by ID
- `GET /api/products/category/:category` - Get products by category

### Upload
- `POST /api/upload` - Upload single image
- `POST /api/upload-multiple` - Upload multiple images
- `DELETE /api/upload/delete/:publicId` - Delete image

## 🎯 Features in Detail

### Product Filtering
- Filter by category (men, women, unisex, kids)
- Filter by brand
- Filter by price range
- Search by name or description
- Sort by price (asc/desc), name, or newest

### Image Optimization
- Automatic format conversion (WebP, AVIF)
- Responsive images with Cloudinary
- Lazy loading
- Fallback placeholders

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart (localStorage)
- Real-time total calculation

## 🚀 Deployment

### Backend (Vercel)
```bash
cd backend
vercel --prod
```

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Environment Variables for Production

#### Backend (.env)
```env
MONGODB_URI=your_production_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.vercel.app
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.vercel.app/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## 📊 Database Seeding

Seed the database with initial products:
```bash
cd backend
node scripts/seed.js
```

Upload category images to Cloudinary:
```bash
node scripts/upload-categories.js
```

Migrate product images to Cloudinary:
```bash
node scripts/migrate-images.js
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
Uyo-oghene - https://github.com/UyoOghene

## 🙏 Acknowledgments

- Images sourced from [Unsplash](https://unsplash.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons)
- Fonts from [Google Fonts](https://fonts.google.com)



