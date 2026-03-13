import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiShoppingBag, FiHeart, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Get API URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/products/${id}`);
        setProduct(data);
        
        // Fetch related products (same category)
        const relatedRes = await axios.get(`${API_URL}/products/category/${data.category}`);
        setRelatedProducts(relatedRes.data.filter(p => p._id !== data._id).slice(0, 4));
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Generate optimized Cloudinary URL
  const getOptimizedImageUrl = (url, width = 600, height = 600) => {
    if (!url) return '';
    
    if (url.includes('cloudinary')) {
      // Split the URL to insert transformations
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        return `${parts[0]}/upload/w_${width},h_${height},c_fill,q_auto,f_auto/${parts[1]}`;
      }
    }
    return url;
  };

  // Generate fallback image based on category
  const getFallbackImage = (category) => {
    const colors = {
      men: '3b82f6',
      women: 'ec4899',
      unisex: '8b5cf6',
      kids: 'f59e0b'
    };
    const color = colors[category] || 'e37380';
    
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_600,h_600,c_fill,b_rgb:${color}/v1/perfume-store/placeholder`;
  };

  const handleImageError = (e, category) => {
    e.target.src = getFallbackImage(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-chers-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fragrance details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
          <Link to="/products" className="text-chers-pink hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-chers-soft min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-chers-pink mb-6 transition">
          <FiArrowLeft className="mr-2" />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="bg-chers-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-chers-pale">
                <img 
                  src={getOptimizedImageUrl(product.imageUrl, 600, 600)}
                  alt={product.name}
                  onError={(e) => handleImageError(e, product.category)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Stock Badge */}
              {product.stock < 5 && product.stock > 0 && (
                <span className="absolute top-4 right-4 bg-chers-pink text-white px-4 py-2 rounded-full text-sm font-medium">
                  Only {product.stock} left in stock
                </span>
              )}
              {product.stock === 0 && (
                <span className="absolute top-4 right-4 bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Info Section */}
            <div>
              <p className="text-chers-pink text-sm mb-2">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <span className="text-3xl font-serif text-chers-pink">${product.price}</span>
                <span className="text-gray-500 ml-3">{product.size}</span>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Fragrance Notes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note, index) => (
                    <span 
                      key={index}
                      className="bg-chers-soft text-gray-700 px-4 py-2 rounded-full text-sm"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="px-4 py-2 text-gray-600 hover:bg-chers-pale disabled:opacity-50 transition"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-200 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="px-4 py-2 text-gray-600 hover:bg-chers-pale disabled:opacity-50 transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-3 rounded-md flex items-center justify-center space-x-2 transition ${
                    product.stock === 0 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-chers-pink text-white hover:bg-opacity-90 hover:shadow-lg'
                  }`}
                >
                  <FiShoppingBag />
                  <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                </button>

                <button 
                  className="p-3 border border-gray-200 rounded-md hover:bg-chers-pale transition"
                  aria-label="Add to wishlist"
                >
                  <FiHeart className="text-xl" />
                </button>
              </div>

              {/* SKU */}
              <p className="text-sm text-gray-400">SKU: {product.sku}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(related => (
                <Link key={related._id} to={`/product/${related._id}`}>
                  <div className="bg-chers-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
                    <div className="aspect-square bg-chers-pale overflow-hidden">
                      <img 
                        src={getOptimizedImageUrl(related.imageUrl, 300, 300)}
                        alt={related.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        onError={(e) => handleImageError(e, related.category)}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-lg mb-1 group-hover:text-chers-pink transition">
                        {related.name}
                      </h3>
                      <p className="text-chers-pink font-semibold">${related.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;