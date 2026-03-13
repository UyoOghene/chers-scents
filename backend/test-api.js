const axios = require('axios');

const testAPI = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    console.log('✅ API Response:', response.data.length, 'products found');
    console.log('First product:', response.data[0]);
  } catch (error) {
    console.error('❌ API Error:', error.message);
  }
};

testAPI();