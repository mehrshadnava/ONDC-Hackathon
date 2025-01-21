// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";

const Login = () => {
  const [useEmail, setUseEmail] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:5000/send-otp', { phoneNumber });
      alert('OTP sent to your phone!');
    } catch (error) {
      alert('Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { phoneNumber });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {useEmail ? (
          <form onSubmit={handleEmailLogin} className="email-login-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <button type="submit" className="submit-button">Login</button>
          </form>
        ) : (
          <div className="otp-login">
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="input-field"
            />
            <button onClick={sendOtp} className="send-otp-button">Send OTP</button>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="input-field"
            />
            <button onClick={verifyOtp} className="verify-otp-button">Verify OTP</button>
          </div>
        )}
        <button onClick={() => setUseEmail(!useEmail)} className="toggle-button">
          {useEmail ? 'Use Phone Number' : 'Use Email'}
        </button>
      </div>
    </div>
  );
};

export default Login;
