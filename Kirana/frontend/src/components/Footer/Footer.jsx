import React from "react";
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Sell on KiranaBazaar</h3>
          <ul>
            <li><a href="#register">How to register as a seller</a></li>
            <li><a href="#how-to-sell">How to sell on KiranaBazaar</a></li>
            <li><a href="#sell-online">Sell online</a></li>
            <li><a href="#offers">Offers for new sellers</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Grow your Business</h3>
          <ul>
            <li><a href="#tools">Tools to grow your business</a></li>
            <li><a href="#global-selling">Global selling</a></li>
            <li><a href="#more-programs">More selling programs</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Seller Blog</h3>
          <ul>
            <li><a href="#launching-business">Launching your online business in India: key considerations</a></li>
            <li><a href="#budget-ideas">Budget-friendly business ideas to start your online business</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Social Media</h3>
          <ul>
            <li><a href="#facebook">Facebook</a></li>
            <li><a href="#youtube">YouTube</a></li>
            <li><a href="#instagram">Instagram</a></li>
            <li><a href="#linkedin">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <ul>
          <li><a href="#terms">Terms of Service</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
        </ul>
        <p>© 2025, KiranaBazaar.com</p>
      </div>

    </footer>
  );
};

export default Footer;
