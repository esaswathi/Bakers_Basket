import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/style.css";

const CONFIRM_PURCHASE = gql`
  mutation confirmPurchase(
    $address: String!, 
    $cardDetails: String!, 
    $totalAmount: Float!,
    $productId: ID!,
    $productName: String!,
    $vendorId: ID!,
    $quantity: Int!,
     $status: String!
      $userId: ID!
  ) {
    confirmPurchase(
      address: $address,
      cardDetails: $cardDetails,
      totalAmount: $totalAmount,
      productId: $productId,
      productName: $productName,
      vendorId: $vendorId,
      quantity: $quantity,
      status: $status,
       userId: $userId 
    ) {
      id
      address
      cardDetails
      totalAmount
      purchaseDate
      productId
      productName
      vendorId
      quantity
      status
      userId
    }
  }
`;

const PurchaseProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract state from location
  const { state } = location;

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateAddress, setStateAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cardDetails, setCardDetails] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [confirmPurchase] = useMutation(CONFIRM_PURCHASE);
  const [status] = useState("ordered");

  const generatePDF = (purchaseData) => {
    const doc = new jsPDF();
    doc.text("Purchase Confirmation", 20, 10);
    doc.text(`Product Name: ${purchaseData.productName}`, 10, 20);
    doc.text(`Quantity: ${purchaseData.quantity}`, 10, 30);
    doc.text(`Total Amount: $${purchaseData.totalAmount}`, 10, 40);
    doc.text(`Address: ${address}, ${city}, ${stateAddress}, ${postalCode}`, 10, 40);
    doc.text(`Purchase Date: ${new Date().toLocaleString()}`, 10, 70);

    doc.save("purchase_confirmation.pdf");
  };

  const handlePurchase = async () => {
    console.log("State from location:", state);
    if (!address || !city || !stateAddress || !postalCode || !cardDetails || !cvv || !expiryDate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Make sure state is available
      if (!state) {
        throw new Error("No product information found in state.");
      }
      const userId = sessionStorage.getItem("userId"); 
      const { totalPrice, productId, productName, vendorId, quantity } = state;
      console.log("Address:", address);
      console.log("Card Details:", cardDetails);
      console.log("Total Price:", totalPrice);
      console.log("Product ID:", productId);
      console.log("Product Name:", productName);
      console.log("Vendor ID:", vendorId);

      const { data } = await confirmPurchase({
        variables: { 
          address, 
          cardDetails, 
          totalAmount: parseFloat(totalPrice),
          productId,
          productName,
          vendorId,
          quantity,
          status,
          userId
        },
      });  
      console.log("Purchase confirmed:", data);
      alert("Purchase confirmed!");

      generatePDF(data.confirmPurchase);

      navigate("/confirmation");
    } catch (err) {
      console.error("Error confirming purchase:", err);
      alert("Failed to confirm purchase. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <h3 className="mb-4 text-center">Purchase Product</h3>
        <div className="card p-4 shadow-sm">
          <form>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                placeholder="Enter your state"
                value={stateAddress}
                onChange={(e) => setStateAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postalCode" className="form-label">Postal Code</label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                placeholder="Enter your postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cardDetails" className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                id="cardDetails"
                placeholder="Enter your card number"
                value={cardDetails}
                onChange={(e) => setCardDetails(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
              <input
                type="text"
                className="form-control"
                id="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cvv" className="form-label">CVV</label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                placeholder="Enter your CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
            <button type="button" className="btn btn-primary w-100" onClick={handlePurchase}>
              Confirm Purchase
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PurchaseProduct;
