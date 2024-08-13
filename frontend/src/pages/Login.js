import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import loginImage from "../assets/images/user_banner.jpeg";
import "../assets/css/style.css";
import { HiOutlineSpeakerphone } from "react-icons/hi";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const [result, setResult] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { email, password } });
      localStorage.setItem("token", data.loginUser.token);
      sessionStorage.setItem("userId", data.loginUser.user.id);
      sessionStorage.setItem("userRole", data.loginUser.user.role);
      setResult(true);

      setTimeout(() => {
        if (data.loginUser.user.role === "vendor") {
          navigate("/VendorHome");
        } else if (data.loginUser.user.role  === 'admin') {
          navigate('/adminHome'); 
        }else {
          navigate("/products");
        }
      }, 2000);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div>
      <Navbar />

      <div
        id="loginBannerImage"
        className="d-flex justify-content-center align-items-center min-vh-100 bg-cover"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
        }}
      >
        <div
          className="card bg-light text-dark p-4 mb-5"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <h2 className="card-title text-center pb-2 m-3">Welcome Back!</h2>

          <div className="alert alert-warning mb-0 text-center" role="alert">
            <h3>
              Limited Time Offer
              <HiOutlineSpeakerphone
                className="text-warning"
                style={{ fontSize: "3rem" }}
              />
            </h3>
            <span className="display-5">20%</span> OFF on all treats! Use code{" "}
            <strong>"BB20TREAT"</strong> at checkout.
          </div>

          {error && (
            <div className="alert alert-danger mt-4">
              Login failed. Please check your credentials.
            </div>
          )}

          <div
            className="alert alert-success mt-5 ml-3 mr-3"
            role="alert"
            style={{ display: result ? "block" : "none" }}
          >
            Login Successful
          </div>

          <div className="card-body">
            <form onSubmit={handleLogin}>
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
              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
