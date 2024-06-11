import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import loginImage from '../assets/images/user_banner.jpeg';
import '../assets/css/style.css';
import { HiOutlineSpeakerphone } from "react-icons/hi";

const Login = () => {
  return (
    <div>
      <Navbar />

      {/* Login Form with Promo Bar */}
      <div
        id="loginBannerImage"
        className="d-flex justify-content-center align-items-center min-vh-100 bg-cover"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="card bg-light text-dark p-4 mb-5" style={{ maxWidth: '600px', width: '100%' }}>
            <h2 className="card-title text-center pb-2 m-3">Welcome Back!</h2>

          {/* Offer Banner */}
          <div className="alert alert-warning mb-0 text-center" role="alert">
            <h3>Limited Time Offer 
                <HiOutlineSpeakerphone className="text-warning" style={{ fontSize: "3rem" }} /></h3>
                <span className='display-5'>20%</span> OFF on all treats! Use code <strong>"BB20TREAT"</strong> at checkout.
          </div>

          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                />
                <div className="invalid-feedback">Please enter a valid email address.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  minLength="6"
                />
                <div className="invalid-feedback">Password must be at least 6 characters long.</div>
              </div>
              <button type="submit" className="btn btn-warning w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
