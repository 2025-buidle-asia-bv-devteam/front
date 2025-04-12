import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

const Footer: React.FC = () => {

  return (
    <footer className="footer">
      <div className="footer-top">
        <Link to="/"><p>THYMIAN</p></Link>
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <h4>Select Shop</h4>
          <ul>
            <li>Scent Studio</li>
            <li>Scent Market</li>
            <li>Gallery Zone</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li>Discord</li>
            <li>Twitter / X</li>
            <li>GitHub</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Governance</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms &amp; Conditions</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 