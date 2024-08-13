import React from "react";
import BakersBasketLogo from "../assets/images/bakersbasket_logo.jpg";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; 

// Footer Section
const Footer = () => {
  return (
    <footer className="footer mt-auto py-5">
      <div className="container">
        <div className="row text-center text-md-left">
          <div className="col-md-4 mb-4">
            <img
              src={BakersBasketLogo}
              alt="Baker's Basket Logo"
              className="footer-logo mb-3"
              height={50}
            />
            <div className="text-muted">Copyright© 2024 Baker's Basket</div>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Contact Here</h5>
            <ul className="list-unstyled">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:info@bakersbasket.com" className="text-muted">
                  info@bakersbasket.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:+1234567890" className="text-muted">
                  +1 (234) 567-890
                </a>
              </li>
              <hr/>
              <li>
                <p className="text-muted">
                  {" "}
                  <strong>Address: </strong>
                  Baker's Basket,101 South Street,
                  <br />
                  Kitchener - N2P 2L8,
                  <br />
                  Canada
                </p>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase">Follow Us</h5>
            <div className="social-icons">
              <a href="#" className="text-muted mx-2">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-muted mx-2">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-muted mx-2">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-muted mx-2">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
