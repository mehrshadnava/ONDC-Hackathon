import React, { useState } from 'react';
import axios from 'axios';
import './BarcodeInput.css';


function BarcodeInput() {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/products', { barcode });
      setProduct(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching product details', error);
      setError('Failed to fetch product details');
    }
  };

  return (
    <div>
      <h2>Enter Barcode</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter Barcode"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {product && (
        <div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          {/* Display other product details as needed */}
        </div>
      )}
    </div>
  );
}

export default BarcodeInput;
