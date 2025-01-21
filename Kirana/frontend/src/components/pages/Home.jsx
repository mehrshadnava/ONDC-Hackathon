import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import "../styles/home.css";
import hero from '../../assets/images/hero-image1.png';
import category1 from '../../assets/images/category1.png';
import category2 from '../../assets/images/category2.png';
import category3 from '../../assets/images/category3.png';
import category4 from '../../assets/images/category4.png';
import category5 from '../../assets/images/category5.png';
import category6 from '../../assets/images/category6.png';
import category7 from '../../assets/images/category7.png';
import category8 from '../../assets/images/category8.png';
import category9 from '../../assets/images/category9.png';
import sellerIcon from '../../assets/images/monitor.png';
import guideIcon from '../../assets/images/checklist.png';
import beginnerIcon from '../../assets/images/information.png';

const categories = [
  { id: 1, name: "Fresh Fruits", image: category1, link: "/categories/fresh-fruits" },
  { id: 2, name: "Fresh Vegetables", image: category2, link: "/categories/fresh-vegetables" },
  { id: 3, name: "Dairy Bread Eggs", image: category3, link: "/categories/dairy" },
  { id: 4, name: "Meat and Fish", image: category4, link: "/categories/meat" },
  { id: 5, name: "Snacks", image: category5, link: "/categories/snacks" },
  { id: 6, name: "Spices", image: category6, link: "/categories/spices" },
  { id: 7, name: "Flour Rice Dals", image: category7, link: "/categories/flour" },
  { id: 8, name: "Beverages", image: category8, link: "/categories/beverages" },
  { id: 9, name: "Cleaning", image: category9, link: "/categories/cleaning" },
];

const Home = () => {
  useEffect(() => {
    if (!document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
      const googleTranslateScript = document.createElement('script');
      googleTranslateScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      googleTranslateScript.async = true;
      document.body.appendChild(googleTranslateScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'hi,mr', // Hindi and Marathi
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      };
    }

    return () => {
      delete window.googleTranslateElementInit;
      const googleTranslateScript = document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
      if (googleTranslateScript) {
        googleTranslateScript.remove();
      }
    };
  }, []);

  return (
    <>
      {/* Google Translate Widget */}
      <div id="google_translate_element" style={{ margin: "10px", textAlign: "right" }}></div>

      {/* ============ Hero Section Start =========== */}
      <section className='hero-section'>
        <Row>
          <Col lg='12'>
            <div className='hero-background'></div>
            <div className='hero-text'>
              <h1>Welcome to KiranaBazaar</h1>
              <p>Your one-stop solution for all grocery needs</p>
            </div>
            <a href="/selling" className="hero-image-link">
              <img src={hero} alt="Start Selling" className="hero-image" />
            </a>
          </Col>
        </Row>
      </section>
      {/* ============ Hero Section End =========== */}

      {/* ============ Categories Section Start =========== */}
      <section className='categories-section'>
        <h2 className='section-title'>Sell By Categories</h2>
        <Row className="categories-grid">
          {categories.map((category) => (
            <Col lg="2" md="3" sm="4" xs="4" key={category.id} className="category-item">
              <a href={category.link} className="category-link">
                <div className="category-card">
                  <img src={category.image} alt={category.name} className="category-image" />
                  <p className="category-name">{category.name}</p>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </section>
      {/* ============ Categories Section End =========== */}

      {/* ============ Card Section Start =========== */}
      <div className="info-section">
        <div className="info-card">
          <div className="info-icon">
            <img src={sellerIcon} alt="Become a Seller" />
          </div>
          <h3>Become a Seller on KiranaBazaar</h3>
          <p>Make your products available to customers 24x7</p>
          <a href="#register-seller">Register as KiranaBazaar seller →</a>
        </div>
        <div className="info-card">
          <div className="info-icon">
            <img src={guideIcon} alt="Registration Guide" />
          </div>
          <h3>Step-by-step registration guide</h3>
          <p>A detailed walk-through of the new seller account creation process</p>
          <a href="/registration-guide">How to Register as a Seller →</a>
        </div>
        <div className="info-card">
          <div className="info-icon">
            <img src={beginnerIcon} alt="Beginner's Guide" />
          </div>
          <h3>Beginner's guide to Sell on KiranaBazaar</h3>
          <p>A one-stop guide to help you begin your online selling journey with KiranaBazaar</p>
          <a href="#beginner-guide">Download beginner's guide →</a>
        </div>
      </div>
      {/* ============ Card Section End =========== */}
    </>
  );
};

export default Home;
