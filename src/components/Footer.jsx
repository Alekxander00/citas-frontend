import React from 'react';
import { FaHeart, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3><FaMapMarkerAlt /> Dirección</h3>
          <p>Calle Principal #123</p>
          <p>Tunja, Boyacá</p>
        </div>
        
        <div className="footer-section">
          <h3><FaPhoneAlt /> Contacto</h3>
          <p>Tel: (123) 456-7890</p>
          <p>Emergencias: (123) 456-7891</p>
        </div>
        
        <div className="footer-section">
          <h3><FaEnvelope /> Correo</h3>
          <p>info@clinica.com</p>
          <p>citas@clinica.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 Sistema de Agendamiento de Citas. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;