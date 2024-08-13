import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdDeliveryDining } from "react-icons/md";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="card p-4 shadow-sm text-center"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <MdDeliveryDining size="4x" className="mb-4 text-warning" />
          <h2 className="text-center display-4 mb-4">Hurray!</h2>
          <p>Your order has been confirmed.</p>
          <button
            className="btn btn-warning mt-3"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Confirmation;
