import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminImageUpload from './AdminImageUpload';

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'men',
    price: '',
    size: '',
    stock: '',
    sku: '',
    description: '',
    notes: '',
    imageUrl: '',
    imagePublicId: '',
    isFeatured: false
  });

  const handleImageUploaded = (url, publicId) => {
    setFormData({
      ...formData,
      imageUrl: url,
      imagePublicId: publicId
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.imageUrl) {
      toast.error('Please upload an image first');
      return;
    }

    try {
      const productData = {
        ...formData,
        notes: formData.notes.split(',').map(note => note.trim()),
        price: Number(formData.price),
        stock: Number(formData.stock)
      };

      await axios.post('/api/products', productData);
      toast.success('Product added successfully!');
      
      // Reset form
      setFormData({
        name: '', brand: '', category: 'men', price: '',
        size: '', stock: '', sku: '', description: '',
        notes: '', imageUrl: '', imagePublicId: '', isFeatured: false
      });
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      
      <div className="mb-6">
        <label className="block mb-2">Product Image</label>
        <AdminImageUpload onImageUploaded={handleImageUploaded} />
        {formData.imageUrl && (
          <p className="text-sm text-green-600 mt-2">✓ Image uploaded</p>
        )}
      </div>

      {/* Rest of your form fields */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Brand"
          value={formData.brand}
          onChange={(e) => setFormData({...formData, brand: e.target.value})}
          className="border p-2 rounded"
          required
        />
        {/* Add other fields similarly */}
      </div>

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  );
};

export default AdminAddProduct;