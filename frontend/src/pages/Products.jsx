import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Get API URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ 
    category: '', 
    brand: '',
    priceRange: '',
    sort: 'newest' 
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [priceRanges] = useState([
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $300', min: 200, max: 300 },
    { label: 'Over $300', min: 300, max: 10000 }
  ]);

  const location = useLocation();
  const navigate = useNavigate();

  // Get category from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || '';
    setFilters(prev => ({ ...prev, category }));
  }, [location]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_URL}/products`);
        setProducts(data);
        
        // Extract unique brands
        const uniqueBrands = [...new Set(data.map(p => p.brand))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Apply brand filter
    if (filters.brand) {
      result = result.filter(p => p.brand === filters.brand);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(p => p.price >= min && p.price <= max);
    }

    // Apply sorting
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredProducts(result);

    // Update URL with category filter
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    navigate({ search: params.toString() }, { replace: true });

  }, [filters, products, navigate]);

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      priceRange: '',
      sort: 'newest'
    });
  };

  const getCategoryTitle = () => {
    switch (filters.category) {
      case 'men': return "Men's Collection";
      case 'women': return "Women's Collection";
      case 'unisex': return "Unisex Collection";
      case 'kids': return "Kids Collection";
      default: return "Our Collection";
    }
  };

  const getProductCount = () => {
    return `${filteredProducts.length} ${filteredProducts.length === 1 ? 'Product' : 'Products'}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-chers-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading our fragrance collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-chers-soft min-h-screen">
      {/* Header Section */}
      <div className="bg-chers-white border-b border-chers-pale">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-serif text-chers-pink mb-4">
            {getCategoryTitle()}
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Discover our carefully curated selection of luxury fragrances, 
            each telling its own unique story through exquisite notes and lasting impressions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="w-full bg-chers-white border border-chers-pink text-chers-pink py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-chers-pale transition"
          >
            <FiFilter />
            <span>Filter & Sort</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-chers-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl">Filters</h2>
                {(filters.category || filters.brand || filters.priceRange) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-chers-pink hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  {['all', 'men', 'women', 'unisex', 'kids'].map(cat => (
                    <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={filters.category === (cat === 'all' ? '' : cat)}
                        onChange={(e) => setFilters({ 
                          ...filters, 
                          category: e.target.value === 'all' ? '' : e.target.value 
                        })}
                        className="text-chers-pink focus:ring-chers-pink"
                      />
                      <span className="text-gray-700 capitalize">
                        {cat === 'all' ? 'All Categories' : cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              {brands.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Brand</h3>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-chers-pink"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      value=""
                      checked={!filters.priceRange}
                      onChange={() => setFilters({ ...filters, priceRange: '' })}
                      className="text-chers-pink focus:ring-chers-pink"
                    />
                    <span className="text-gray-700">All Prices</span>
                  </label>
                  {priceRanges.map(range => (
                    <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        value={`${range.min}-${range.max}`}
                        checked={filters.priceRange === `${range.min}-${range.max}`}
                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                        className="text-chers-pink focus:ring-chers-pink"
                      />
                      <span className="text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(filters.category || filters.brand || filters.priceRange) && (
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm text-gray-500 mb-2">Active Filters:</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.category && (
                      <span className="inline-flex items-center space-x-1 bg-chers-pale text-chers-pink px-2 py-1 rounded-md text-sm">
                        <span className="capitalize">{filters.category}</span>
                        <button
                          onClick={() => setFilters({ ...filters, category: '' })}
                          className="hover:text-chers-pink"
                        >
                          <FiX size={14} />
                        </button>
                      </span>
                    )}
                    {filters.brand && (
                      <span className="inline-flex items-center space-x-1 bg-chers-pale text-chers-pink px-2 py-1 rounded-md text-sm">
                        <span>{filters.brand}</span>
                        <button
                          onClick={() => setFilters({ ...filters, brand: '' })}
                          className="hover:text-chers-pink"
                        >
                          <FiX size={14} />
                        </button>
                      </span>
                    )}
                    {filters.priceRange && (
                      <span className="inline-flex items-center space-x-1 bg-chers-pale text-chers-pink px-2 py-1 rounded-md text-sm">
                        <span>${filters.priceRange.replace('-', ' - $')}</span>
                        <button
                          onClick={() => setFilters({ ...filters, priceRange: '' })}
                          className="hover:text-chers-pink"
                        >
                          <FiX size={14} />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Filter Sidebar */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileFilterOpen(false)}
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween' }}
                  className="fixed right-0 top-0 bottom-0 w-80 bg-chers-white z-50 lg:hidden overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-xl">Filters</h2>
                      <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="p-2 hover:bg-chers-pale rounded-full"
                      >
                        <FiX size={20} />
                      </button>
                    </div>

                    {/* Mobile filter content */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Category</h3>
                      <div className="space-y-2">
                        {['all', 'men', 'women', 'unisex', 'kids'].map(cat => (
                          <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="mobile-category"
                              value={cat}
                              checked={filters.category === (cat === 'all' ? '' : cat)}
                              onChange={(e) => {
                                setFilters({ 
                                  ...filters, 
                                  category: e.target.value === 'all' ? '' : e.target.value 
                                });
                                setMobileFilterOpen(false);
                              }}
                              className="text-chers-pink focus:ring-chers-pink"
                            />
                            <span className="text-gray-700 capitalize">
                              {cat === 'all' ? 'All Categories' : cat}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {brands.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-medium mb-3">Brand</h3>
                        <select
                          value={filters.brand}
                          onChange={(e) => {
                            setFilters({ ...filters, brand: e.target.value });
                            setMobileFilterOpen(false);
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-md"
                        >
                          <option value="">All Brands</option>
                          {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="mobile-price"
                            value=""
                            checked={!filters.priceRange}
                            onChange={() => {
                              setFilters({ ...filters, priceRange: '' });
                              setMobileFilterOpen(false);
                            }}
                            className="text-chers-pink"
                          />
                          <span>All Prices</span>
                        </label>
                        {priceRanges.map(range => (
                          <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="mobile-price"
                              value={`${range.min}-${range.max}`}
                              checked={filters.priceRange === `${range.min}-${range.max}`}
                              onChange={(e) => {
                                setFilters({ ...filters, priceRange: e.target.value });
                                setMobileFilterOpen(false);
                              }}
                              className="text-chers-pink"
                            />
                            <span>{range.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={clearFilters}
                      className="w-full bg-chers-pink text-white py-2 rounded-md hover:bg-opacity-90 transition"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results Bar */}
            <div className="bg-chers-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-600 mb-2 sm:mb-0">
                {getProductCount()}
              </p>
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-gray-600 text-sm">Sort by:</label>
                <select
                  id="sort"
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  className="px-3 py-1 border border-gray-200 rounded-md focus:outline-none focus:border-chers-pink text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-chers-white rounded-lg shadow-sm p-12 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="font-serif text-2xl text-gray-800 mb-4">No Products Found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any products matching your current filters. 
                    Try adjusting your filters or browse our full collection.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-chers-pink text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition inline-block"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;