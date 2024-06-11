import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import BakersBasketLogo from '../assets/images/bakersbasket_logo.png';
import '../assets/css/style.css';

// UserPage - Navbar
const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <div className="container">
        {/* Logo and Brand */}
        <Navbar.Brand href="#" className="brand">
          <img src={BakersBasketLogo} alt="Header Logo" height="80" className="brand-position" />
          <span className="ps-3 brand-position" >Baker'S Basket</span>
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="navbarNav" />

        {/* Navbar Content */}
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            {/* Menu items */}
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#orders">Orders</Nav.Link>
            <Nav.Link href="#wishlist">Wishlist</Nav.Link>
            <Nav.Link href="#notifications">Notifications</Nav.Link>
            <Nav.Link href="#referrals">Referrals</Nav.Link>
            <Nav.Link href="#" className="btn btn-warning ms-5 me-2 text-dark">Cart</Nav.Link>
            <Nav.Link href="#" className="btn btn-warning text-dark">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
