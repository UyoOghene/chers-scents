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

  // Generate a color based on product category for placeholder
  const getCategoryColor = () => {
    switch(product.category) {
      case 'men': return '#3b82f6';
      case 'women': return '#ec4899';
      case 'unisex': return '#8b5cf6';
      case 'kids': return '#f59e0b';
      default: return '#e37380';
    }
  };

  // Create a data URL for a colored placeholder with text
  const createPlaceholderDataUrl = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Fill with category color
    ctx.fillStyle = getCategoryColor();
    ctx.fillRect(0, 0, 400, 400);
    
    // Add pattern
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    for(let i = 0; i < 400; i += 40) {
      ctx.fillRect(i, 0, 20, 400);
    }
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(product.name.substring(0, 20), 200, 200);
    
    ctx.font = '18px Arial';
    ctx.fillText(product.brand, 200, 240);
    
    ctx.font = '16px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText(product.category, 200, 280);
    
    return canvas.toDataURL();
  };

  const [placeholderDataUrl, setPlaceholderDataUrl] = useState('');

  // Generate placeholder on component mount
  useState(() => {
    setPlaceholderDataUrl(createPlaceholderDataUrl());
  }, []);

  // Try multiple image sources
  const imageSources = [
    `http://localhost:5000${product.imageUrl}`,
    `http://localhost:5000/images/${product.sku}.jpg`,
    `http://localhost:5000/images/${product.name.toLowerCase().replace(/\s+/g, '_')}_${product.category}.jpg`,
    placeholderDataUrl || createPlaceholderDataUrl()
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageError = () => {
    if (currentImageIndex < imageSources.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  return (
    <div className="group relative bg-chers-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product._id}`}>
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-chers-pale">
          <img 
            src={imageSources[currentImageIndex]}
            alt={product.name}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          
          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={handleWishlist}
              className="bg-white p-3 rounded-full mx-2 hover:bg-chers-pink hover:text-white transition-colors"
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