// Signup.js

import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    gstNumber: '',
  });
  const [otp, setOtp] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/send-otp', {
        phoneNumber: formData.phoneNumber,
      });
      alert('OTP sent to your phone!');
      setStep(2);
    } catch (error) {
      alert('Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post('http://localhost:5000/verify-otp', {
        phoneNumber: formData.phoneNumber,
        otp,
      });
      alert('OTP verified!');
      setStep(3);
    } catch (error) {
      alert('Invalid OTP');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', formData);
      alert('Signup successful! You can now log in.');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {step === 1 && (
        <div>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="gstNumber"
            placeholder="GST Number"
            value={formData.gstNumber}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Signup</button>
        </form>
      )}
    </div>
  );
};

export default Signup;
