import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminImageUpload = ({ onImageUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const { data } = await axios.post('/api/upload/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Image uploaded successfully!');
      onImageUploaded(data.imageUrl, data.publicId);
    } catch (error) {
      toast.error('Upload failed');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded" />
          <button
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
          >
            ×
          </button>
        </div>
      ) : (
        <label className="cursor-pointer block">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
          <div className="text-center py-8">
            {uploading ? (
              <p>Uploading...</p>
            ) : (
              <>
                <p className="text-gray-600">Click to upload image</p>
                <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </>
            )}
          </div>
        </label>
      )}
    </div>
  );
};

export default AdminImageUpload;