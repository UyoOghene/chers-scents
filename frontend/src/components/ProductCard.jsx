import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHeart } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  // Generate Cloudinary URL with optimizations
  const getOptimizedImageUrl = () => {
    if (!product.imageUrl) return '';
    
    // If it's already a Cloudinary URL, add transformations
    if (product.imageUrl.includes('cloudinary')) {
      // Split the URL to insert transformations
      const parts = product.imageUrl.split('/upload/');
      if (parts.length === 2) {
        // Add transformations: width 400, height 400, crop fill, auto quality, auto format
        return `${parts[0]}/upload/w_400,h_400,c_fill,q_auto,f_auto/${parts[1]}`;
      }
    }
    return product.imageUrl;
  };

  // Fallback image based on category
  const getFallbackImage = () => {
    const colors = {
      men: '3b82f6',
      women: 'ec4899',
      unisex: '8b5cf6',
      kids: 'f59e0b'
    };
    const color = colors[product.category] || 'e37380';
    
    // Use Cloudinary to generate a colored placeholder
    return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_400,h_400,c_fill,b_rgb:${color}/v1/perfume-store/placeholder`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="group relative bg-chers-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product._id}`}>
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-chers-pale">
          <img 
            src={imageError ? getFallbackImage() : getOptimizedImageUrl()}
            alt={product.name}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            loading="lazy"
          />
          
          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={handleWishlist}
              className="bg-white p-3 rounded-full mx-2 hover:bg-chers-pink hover:text-white transition-colors"
              aria-label="Add to wishlist"
            >
              <FiHeart className={`text-xl ${isWishlisted ? 'fill-chers-pink text-chers-pink' : ''}`} />
            </button>
          </div>

          {/* Category Badge */}
          <span className="absolute top-4 left-4 bg-chers-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-chers-pink capitalize">
            {product.category}
          </span>

          {/* Stock Status */}
          {product.stock < 5 && product.stock > 0 && (
            <span className="absolute top-4 right-4 bg-chers-pink text-white px-3 py-1 rounded-full text-xs font-medium">
              Only {product.stock} left
            </span>
          )}
          
          {product.stock === 0 && (
            <span className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
            <h3 className="font-serif text-xl text-gray-800 group-hover:text-chers-pink transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>

          {/* Notes/Pills */}
          {product.notes && product.notes.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.notes.slice(0, 3).map((note, index) => (
                <span 
                  key={index}
                  className="text-xs bg-chers-soft text-gray-600 px-2 py-1 rounded-full"
                >
                  {note}
                </span>
              ))}
              {product.notes.length > 3 && (
                <span className="text-xs bg-chers-soft text-gray-600 px-2 py-1 rounded-full">
                  +{product.notes.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Price and Size */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-serif text-chers-pink">${product.price}</span>
              <span className="text-sm text-gray-500 ml-2">{product.size}</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-md flex items-center justify-center space-x-2 transition-all transform group-hover:translate-y-0 translate-y-0 ${
              product.stock === 0 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-chers-pink text-white hover:bg-opacity-90 hover:shadow-lg'
            }`}
          >
            <FiShoppingBag />
            <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;