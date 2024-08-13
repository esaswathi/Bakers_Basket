import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import registerImage from "../assets/images/user_banner.jpeg";
import "../assets/css/style.css";

const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      role: $role
    ) {
      id
      username
      email
      role
    }
  }
`;

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // default to 'user'
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      console.log("Registering with:", { username, email, password, role });
      const { data } = await registerUser({
        variables: { username, email, password, role },
      });
      console.log("Registered user:", data.registerUser);
      setMessage("Registration Successful");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error registering user:", error);
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
          backgroundSize: "cover",
        }}
      >
        <div
          className="card bg-light text-dark p-4"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="card-body">
            <h2 className="card-title text-center pb-2">Join and Explore</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
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
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid email address.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                />
                <div className="invalid-feedback">
                  Password must be at least 6 characters long.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
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
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  User Type
                </label>
                <select
                  className="form-select"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="user">User</option>
                  <option value="vendor">Vendor</option>
                </select>
                <div className="invalid-feedback">
                  Please select a user type.
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              {error && (
                <p className="text-danger mt-2 text-center">{error.message}</p>
              )}
            </form>
            <p className="text-center mt-2 text-success">{message}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;
