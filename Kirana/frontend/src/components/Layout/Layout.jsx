import React from 'react';
import Header from '../Header/Header';   // Correct path to Header component
import Routers from '../router/Routers';  // Correct path to Router component
import Footer from '../Footer/Footer';   // Correct path to Footer component

const Layout = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
