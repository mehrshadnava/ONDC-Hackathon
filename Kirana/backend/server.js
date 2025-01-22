require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // Added bodyParser for handling JSON requests

// MongoDB Atlas connection string (stored in .env)
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Twilio Client Initialization (using environment variables from .env)
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Temporary OTP store
const otpStore = {};

// Define Product Schema
const productSchema = new mongoose.Schema({
  barcode: { type: String, required: true, unique: true },
  title: String,
  description: String,
  category: String,
  manufacturer: String,
  brand: String,
  ingredients: String,
  images: [String],
  price: Number,
  quantity: Number,
});

const Product = mongoose.model('Product', productSchema);

// Add a simple route for the root path '/'
app.get('/', (req, res) => {
  res.send('Welcome to the MERN server!');
});

// ----------------------- AUTH ROUTES -----------------------

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password, phoneNumber, gstNumber } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, phoneNumber, gstNumber });
    await newUser.save();

    res.status(201).json({ msg: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ msg: 'Error signing up', error });
  }
});

// Send OTP route
app.post('/send-otp', (req, res) => {
  const { phoneNumber } = req.body;
  const otp = otpGenerator.generate(6, { digits: true });
  otpStore[phoneNumber] = otp;

  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    })
    .then((message) => console.log('OTP sent:', message.sid))
    .catch((err) => console.error('Error sending OTP:', err));

  res.status(200).json({ msg: 'OTP sent' });
});

// Verify OTP route
app.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (otpStore[phoneNumber] === otp) {
    delete otpStore[phoneNumber];
    res.status(200).json({ msg: 'OTP verified' });
  } else {
    res.status(400).json({ msg: 'Invalid OTP' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  try {
    let user;
    if (email) {
      user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
      if (!user) return res.status(400).json({ msg: 'User not found' });
    } else {
      return res.status(400).json({ msg: 'Email or phone number required' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ msg: 'Error logging in', error });
  }
});

// ----------------------- PRODUCT ROUTES -----------------------

// Route to get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from DB
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a product by barcode (POST)
app.post('/api/products', async (req, res) => {
  const { barcode } = req.body;

  try {
    const apiKey = process.env.API_KEY;
    const response = await axios.get(`https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=${apiKey}`);
    const productDetails = response.data.products[0];

    if (!productDetails) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { product_name: title, description, category, manufacturer, brand, ingredients, image_url: images } = productDetails;

    const newProduct = new Product({
      barcode,
      title,
      description,
      category,
      manufacturer,
      brand,
      ingredients,
      images: Array.isArray(images) ? images : [images],
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Error fetching product details' });
  }
});

// Route to update a product by its ID
app.put('/api/products/:id', async (req, res) => {
  const { title, description, category, manufacturer, brand, ingredients, images, quantity, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, category, manufacturer, brand, ingredients, images, quantity, price },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete a product by its ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
