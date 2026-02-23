import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products/featured');
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero Section with Image */}
      <section className="relative h-screen max-h-[800px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {/* <img 
            src="/images/heroperfume2.jpg" 
            alt="Luxury perfume collection"
            className="w-full h-full object-cover"
          /> */}
          <video 
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/heroperfvid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-chers-soft/90 to-chers-pale/0 "></div> */}
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center z-10rounded-lg">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-serif text-chers-blush mb-4"
            >
              Discover Your <br />
              <span className="text-chers-pink">Signature Scent</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-chers-blush mb-8 max-w-lg"
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
                className="bg-chers-pink text-white px-8 py-4 rounded-md hover:bg-opacity-90 transition text-lg font-medium"
              >
                Shop Now
              </Link>
              <Link 
                to="/products?category=women" 
                className="bg-white text-chers-pink px-8 py-4 rounded-md hover:bg-chers-pale transition text-lg font-medium border border-chers-pink"
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
                <p className="text-sm text-chers-blush">Luxury Scents</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-chers-pink">15+</p>
                <p className="text-sm text-chers-blush">Premium Brands</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-chers-pink">1000+</p>
                <p className="text-sm text-chers-blush">Happy Customers</p>
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
            {[
              { name: 'women', title: "Women's", image: '/images/heroperfume2.jpg' },
              { name: 'men', title: "Men's", image: '/images/mensscandalperf.jpg' },
              { name: 'unisex', title: 'Unisex', image: '/images/heroperf.jpg' }
            ].map((category, index) => (
              <Link 
                key={category.name}
                to={`/products?category=${category.name}`}
                className="group relative h-96 overflow-hidden rounded-lg"
              >
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-serif mb-2">{category.title}'s Collection</h3>
                  <p className="opacity-90 group-hover:opacity-100 transition">Shop Now →</p>
                </div>
              </Link>
            ))}
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
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-chers-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Join Our Fragrance Club</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to receive exclusive offers, new arrivals, and perfume insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-chers-pink"
            />
            <button className="bg-chers-pink text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;