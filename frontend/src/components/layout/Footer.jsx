import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <h3>OpenDesk</h3>
            <p className="tagline">Public Learning Resources Map for Every Student</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/legal">Privacy Policy</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-sdg">
          <div className="sdg-badges">
            <div className="sdg-badge sdg-4">
              <span className="sdg-num">4</span>
              <span>Quality Education</span>
            </div>
            <div className="sdg-badge sdg-10">
              <span className="sdg-num">10</span>
              <span>Reduced Inequalities</span>
            </div>
          </div>
          <p className="impact-message">
            “Access to a place to learn should never depend on income or location.”
          </p>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} OpenDesk. Built for public good.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
