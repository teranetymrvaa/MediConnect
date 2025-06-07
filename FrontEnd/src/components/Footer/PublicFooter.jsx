import React from "react";
import "./PublicFooter.css";
import { FaFacebookF, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>MediConnect</h3>
          <p>Peşəkar həkimlərlə rahat bağlantı.</p>
        </div>

        <div className="footer-section">
          <h4>Əlaqə</h4>
          <p>Telefon: <a href="tel:+994501234567">+994 51 785 79 83</a></p>
          <p>Email: <a href="mailto:info@mediconnect.az">info@mediconnect.az</a></p>
        </div>

        <div className="footer-section">
          <h4>Sosial Şəbəkələr</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://wa.me/994517857983" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 MediConnect. Bütün hüquqlar qorunur.</p>
      </div>
    </footer>
  );
}

export default PublicFooter;
