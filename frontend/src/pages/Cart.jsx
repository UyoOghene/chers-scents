import { Link } from 'react-router-dom';
import { FiTrash2, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

// Get Cloudinary cloud name from environment
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  // Generate optimized Cloudinary URL
  const getOptimizedImageUrl = (url, width = 100, height = 100) => {
    if (!url) return '';
    
    if (url.includes('cloudinary')) {
      const parts = url.split('/upload/');
      if (parts.length === 2) {
        return `${parts[0]}/upload/w_${width},h_${height},c_fill,q_auto,f_auto/${parts[1]}`;
      }
    }
    return url;
  };

  // Fallback image
  const getFallbackImage = () => {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_100,h_100,c_fill/v1/perfume-store/placeholder`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-chers-soft py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-chers-white rounded-lg shadow-sm p-12">
            <FiShoppingBag className="text-6xl text-chers-pink mx-auto mb-4" />
            <h2 className="text-2xl font-serif mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any fragrances to your cart yet.</p>
            <Link 
              to="/products" 
              className="bg-chers-pink text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-chers-soft min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-chers-white rounded-lg shadow-sm overflow-hidden">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center p-4 border-b last:border-0 hover:bg-chers-soft/30 transition">
                  {/* Product Image */}
                  <Link to={`/product/${item._id}`} className="w-24 h-24 bg-chers-pale rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={getOptimizedImageUrl(item.imageUrl, 100, 100)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = getFallbackImage()}
                      loading="lazy"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="ml-4 flex-grow">
                    <Link to={`/product/${item._id}`}>
                      <h3 className="font-serif text-lg hover:text-chers-pink transition">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-chers-pink font-semibold mt-1">${item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 mx-4">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md hover:bg-chers-pale transition"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md hover:bg-chers-pale transition"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[100px]">
                    <p className="font-semibold text-chers-pink">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 text-sm mt-1 flex items-center justify-end transition"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-chers-pink mt-4 transition">
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-chers-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-serif mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-chers-pink">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <button className="w-full bg-chers-pink text-white py-3 rounded-md hover:bg-opacity-90 transition shadow-md hover:shadow-lg">
                  Proceed to Checkout
                </button>
              </Link>

              <p className="text-xs text-gray-400 text-center mt-4">
                Secure checkout powered by Cloudinary
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;