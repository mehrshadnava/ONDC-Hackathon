import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import RegistrationGuide from '../pages/RegistrationGuide';
import ProductList from '../ProductList/ProductList';
import BarcodeInput from '../BarcodeInput/BarcodeInput';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration-guide" element={<RegistrationGuide />} />
      <Route path="/productlist" element={
  <>
    <BarcodeInput />
    <ProductList />
  </>
}/>
    </Routes>
  );
};

export default Routers;
