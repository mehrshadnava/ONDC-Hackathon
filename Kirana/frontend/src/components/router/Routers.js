import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import RegistrationGuide from '../pages/RegistrationGuide';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration-guide" element={<RegistrationGuide />} />
    </Routes>
  );
};

export default Routers;
