require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');
const User = require('./models/User');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Add a simple route for the root path '/'
app.get('/', (req, res) => {
  res.send('Welcome to the MERN auth server!');
});

// Twilio Client Initialization (using environment variables from .env file)
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Temporary OTP store
const otpStore = {};

// Connect to MongoDB
console.log("Connecting to MongoDB...");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Generate and send OTP
const sendOtp = (phoneNumber, otp) => {
  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    })
    .then((message) => console.log('OTP sent:', message.sid))
    .catch((err) => console.error('Error sending OTP:', err));
};

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password, phoneNumber, gstNumber } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
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

  sendOtp(phoneNumber, otp);
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
    if (email) {
      // Login with email and password
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
      res.status(200).json({ msg: 'Login successful', token });
    } else if (phoneNumber) {
      // Login with phone number (OTP)
      const user = await User.findOne({ phoneNumber });
      if (!user) return res.status(400).json({ msg: 'User not found' });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
      res.status(200).json({ msg: 'Login successful', token });
    } else {
      res.status(400).json({ msg: 'Email or phone number required' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error logging in', error });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



