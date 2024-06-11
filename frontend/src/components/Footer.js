import React from 'react';
import BakersBasketLogo from '../assets/images/bakersbasket_logo.jpg';

// Footer Section
const Footer = () => {
  return (
    <footer className="footer mt-auto py-5">
      <div className="container text-center">
        <img src={BakersBasketLogo} alt="Baker's Basket Logo" className="footer-logo" height={50}/>
        <div className="text-muted py-2">Copyright© 2024 Baker's Basket</div>
      </div>
    </footer>
  );
};

export default Footer;
