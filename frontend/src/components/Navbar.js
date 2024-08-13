import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BakersBasketLogo from "../assets/images/bakersbasket_logo.png";
import "../assets/css/style.css";

const AppNavbar = () => {
  const navigate = useNavigate(); 
  const userRole = sessionStorage.getItem("userRole");

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("token"); 
    sessionStorage.removeItem("userId"); 
    // Navigate to the home page and reload
    window.location.href = "/";
  };

  const handleLogoClick = () => {
    // Clear session storage
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("token"); 
    sessionStorage.removeItem("userId"); 

    // Navigate to the home page and reload
    window.location.href = "/";
  };

  const handleLinkClick = (path) => {
    // Navigate to the specified path and reload
    window.location.href = path;
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="navbar px-3"
      style={{ zIndex: 10 }}
    >
      <div className="container">
        {/* Logo and Brand */}
        <Navbar.Brand
          onClick={() => handleLinkClick("/")}
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
        >
          <img
            src={BakersBasketLogo}
            alt="Header Logo"
            height="50"
            className="me-2"
          />
          <span className="brand-text">Baker's Basket</span>
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="navbarNav" />

        {/* Navbar Content */}
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            {userRole ? (
              <>
                {userRole === "admin" ? (
                  <Nav.Link
                    onClick={() => handleLinkClick("/adminHome")}
                    className="btn btn-warning text-dark mx-1"
                  >
                    Home
                  </Nav.Link>
                ): userRole === "vendor" ? (
                  <Nav.Link
                    onClick={() => handleLinkClick("/VendorHome")}
                    className="btn btn-warning text-dark mx-1"
                  >
                    Home
                  </Nav.Link>
                ) : userRole === "user" ? (
                  <>
                    <Nav.Link
                      onClick={() => handleLinkClick("/products")}
                      className="btn btn-warning text-dark mx-1"
                    >
                      Products
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => handleLinkClick("/CartPage")}
                      className="btn btn-warning text-dark mx-1"
                    >
                      Cart
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => handleLinkClick("/MyOrders")}
                      className="btn btn-warning text-dark mx-1"
                    >
                      My Orders
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => handleLinkClick("/MyWishlist")}
                      className="btn btn-warning text-dark mx-1"
                    >
                      Wishlist
                    </Nav.Link>
                  </>
                ) : null}

                <Nav.Link
                  onClick={handleLogout}
                  className="btn btn-warning text-dark mx-1"
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  onClick={() => handleLinkClick("/login")}
                  className="btn btn-warning text-dark mx-1"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  onClick={() => handleLinkClick("/registration")}
                  className="btn btn-warning text-dark mx-1"
                >
                  Registration
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
