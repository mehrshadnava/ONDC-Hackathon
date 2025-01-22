import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null); // To track which product is being edited
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    manufacturer: '',
    brand: '',
    ingredients: '',
    images: '',
    quantity: 0,
    price: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id)); // Remove the deleted product from the state
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product.');
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setFormData({
      title: product.title,
      description: product.description,
      category: product.category,
      manufacturer: product.manufacturer,
      brand: product.brand,
      ingredients: product.ingredients,
      images: product.images.join(', '), // Convert array to string
      quantity: product.quantity,
      price: product.price,
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData);
      const updatedProducts = products.map((product) =>
        product._id === id ? { ...product, ...formData } : product
      );
      setProducts(updatedProducts); // Update the product in the state
      setEditingProductId(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      {error && <p className="error-message">{error}</p>}
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            {editingProductId === product._id ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                />
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  placeholder="Manufacturer"
                />
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                />
                <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="Ingredients"
                />
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                />
                <button onClick={() => handleSaveEdit(product._id)}>Save</button>
              </div>
            ) : (
              <div>
                <h3>{product.title}</h3>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <button onClick={() => handleEdit(product)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(product._id)} className="delete-button">
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
