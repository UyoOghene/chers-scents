import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

// Get API URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/products/featured`);
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Category images - with fallback if cloud name is missing
  const getCategoryImage = (category) => {
    if (!CLOUD_NAME) {
      // Return local fallback images if cloud name is missing
      return {
        women: '/images/category-women.jpg',
        men: '/images/category-men.jpg',
        unisex: '/images/category-unisex.jpg'
      }[category] || '';
    }
    
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_800,h_600,c_fill,q_auto,f_auto/v1/perfume-store/categories/${category}-collection`;
  };

  const handleImageError = (category) => {
    setImageError(prev => ({
      ...prev,
      [category]: true
    }));
  };

  // Fallback images if Cloudinary fails
  const fallbackImages = {
    women: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
    men: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800',
    unisex: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800'
  };

  // Handle video error
  const handleVideoError = (e) => {
    console.error('Video failed to load');
    // Hide video container or show fallback image
    e.target.style.display = 'none';
    const fallbackImg = e.target.nextElementSibling;
    if (fallbackImg) fallbackImg.style.display = 'block';
  };

  return (
    <div>
      {/* Hero Section with Video */}
      <section className="relative h-screen max-h-[800px] overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0">
          <video 
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onError={handleVideoError}
          >
            <source src="/images/heroperfvid.mp4" type="video/mp4" />
          </video>
          
          {/* Fallback image for video */}
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1920"
            alt="Luxury perfume collection"
            className="w-full h-full object-cover hidden"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1920x1080/f5f0e9/3b3b3b?text=Luxury+Fragrances';
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-chers-soft/90 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center z-10">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-serif text-chers-navy mb-4"
            >
              Discover Your <br />
              <span className="text-chers-pink">Signature Scent</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-chers-navy/80 mb-8 max-w-lg"
            >
              Explore our collection of luxury fragrances crafted with passion and precision. Each bottle tells a unique story.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                to="/products" 
                className="bg-chers-pink text-white px-8 py-4 rounded-md hover:bg-opacity-90 transition text-lg font-medium shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
              <Link 
                to="/products?category=women" 
                className="bg-white text-chers-pink px-8 py-4 rounded-md hover:bg-chers-pale transition text-lg font-medium border-2 border-chers-pink"
              >
                Women's Collection
              </Link>
            </motion.div>

            {/* Stats/Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-8 mt-12"
            >
              <div>
                <p className="text-3xl font-serif text-chers-pink">50+</p>
                <p className="text-sm text-chers-navy/70">Luxury Scents</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-chers-pink">15+</p>
                <p className="text-sm text-chers-navy/70">Premium Brands</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-chers-pink">1000+</p>
                <p className="text-sm text-chers-navy/70">Happy Customers</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-chers-pink rounded-full flex justify-center">
            <div className="w-1 h-3 bg-chers-pink rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-chers-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find your perfect fragrance from our carefully curated collections
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['women', 'men', 'unisex'].map((category, index) => {
              const title = category === 'women' ? "Women's" : 
                           category === 'men' ? "Men's" : 'Unisex';
              const imageUrl = imageError[category] ? 
                fallbackImages[category] : 
                getCategoryImage(category);
              
              return (
                <Link 
                  key={category}
                  to={`/products?category=${category}`}
                  className="group relative h-96 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img 
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    onError={() => handleImageError(category)}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform group-hover:translate-y-[-10px] transition-transform">
                    <h3 className="text-3xl font-serif mb-2">{title} Collection</h3>
                    <p className="opacity-90 group-hover:opacity-100 transition flex items-center">
                      Shop Now 
                      <span className="ml-2 group-hover:ml-4 transition-all">→</span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-chers-soft">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Featured Fragrances</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most beloved scents, handpicked just for you
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-chers-pink border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.length > 0 ? (
                featuredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p className="text-center col-span-4 text-gray-500">
                  No featured products available
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-chers-pink/10 to-chers-soft">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Join Our Fragrance Club</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to receive exclusive offers, new arrivals, and perfume insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-md focus:outline-none focus:border-chers-pink transition"
              />
              <button className="bg-chers-pink text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition shadow-md hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;