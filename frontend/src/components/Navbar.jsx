import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiShoppingBag, FiMenu, FiX, FiUser, FiSearch } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

// Get Cloudinary cloud name from environment
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Women', path: '/products?category=women' },
    { name: 'Men', path: '/products?category=men' },
    { name: 'Unisex', path: '/products?category=unisex' },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 backdrop-blur-md ${
          scrolled 
            ? 'bg-chers-white/95 shadow-lg py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo - Now using Cloudinary for logo */}
            <Link to="/" className="relative z-10">
              <img 
                src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_150,h_50,c_fill,q_auto,f_auto/v1/perfume-store/logonew`}
                alt="Chers" 
                className={`h-12 md:h-16 w-auto transition-all duration-300 ${
                  scrolled ? 'opacity-100' : 'opacity-95'
                }`}
              />
            </Link>
            
            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-5 py-2 text-sm uppercase tracking-wider text-chers-navy hover:text-chers-pink transition-colors duration-300 font-light group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-chers-pink group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Search - Hidden on mobile */}
              <button className="hidden sm:block text-chers-navy hover:text-chers-pink transition-colors">
                <FiSearch className="text-2xl" />
              </button>
              
              {/* Account - Hidden on mobile */}
              <button className="hidden sm:block text-gray-600 hover:text-chers-pink transition-colors">
                <FiUser className="text-2xl" />
              </button>
              
              {/* Cart */}
              <Link to="/cart" className="relative group">
                <FiShoppingBag className="text-2xl sm:text-3xl text-gray-600 group-hover:text-chers-pink transition-colors" />
                <AnimatePresence>
                  {cartItems.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-chers-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-light"
                    >
                      {cartItems.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-600 hover:text-chers-pink transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiX className="text-2xl" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu className="text-2xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Slide Down */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-chers-white/95 backdrop-blur-md border-t border-chers-pale/30"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Search and Account */}
                <div className="flex items-center space-x-4 pb-4 border-b border-chers-pale/30">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-3 border border-chers-pink/30 rounded-md text-gray-600 hover:bg-chers-pink/5 transition">
                    <FiSearch className="text-xl" />
                    <span className="text-base">Search</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-3 border border-chers-pink/30 rounded-md text-gray-600 hover:bg-chers-pink/5 transition">
                    <FiUser className="text-xl" />
                    <span className="text-base">Account</span>
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block py-4 text-xl text-gray-700 hover:text-chers-pink transition-colors border-b border-chers-pale/20 last:border-0 font-light"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Decorative Element */}
                <div className="pt-6 text-center">
                  <p className="text-sm text-chers-pink/60 font-serif italic">
                    Luxury fragrances for the discerning
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-24 md:h-28"></div>
    </>
  );
};

export default Navbar;