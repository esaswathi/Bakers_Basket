import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import registerImage from '../assets/images/user_banner.jpeg';
import '../assets/css/style.css';
import { serverUrl } from '../App';


const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const data = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch(serverUrl + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        id="registerBannerImage"
        className="d-flex justify-content-center align-items-center min-vh-100 bg-cover"
        style={{
          backgroundImage: `url(${registerImage})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="card bg-light text-dark p-4" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="card-body">
            <h2 className="card-title text-center pb-2">Join and Explore</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <div className="invalid-feedback">Please enter a username.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                />
                <div className="invalid-feedback">Password must be at least 6 characters long.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength="6"
                />
                <div className="invalid-feedback">Passwords must match.</div>
              </div>
              <button type="submit" className="btn btn-warning w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;
