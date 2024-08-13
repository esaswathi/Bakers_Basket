import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Updated GraphQL mutation for handling cart checkout
const CHECKOUT_CART = gql`
  mutation checkoutCart(
    $userId: ID!
    $address: String!
    $cardDetails: String!
    $status: String!
  ) {
    checkoutCart(
      userId: $userId
      address: $address
      cardDetails: $cardDetails
      status: $status
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

const CartPurchase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country] = useState("Canada");
  const [cardDetails, setCardDetails] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [checkoutCart] = useMutation(CHECKOUT_CART);

  const validateCvv = (cvv) => /^[0-9]{3}$/.test(cvv);

  const validateExpiryDate = (expiryDate) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(expiryDate)) return false;

    const [month, year] = expiryDate.split("/");
    const currentDate = new Date();
    const expiry = new Date(`20${year}`, month - 1);
    return expiry > currentDate;
  };

  const validateCardNumber = (cardNumber) => /^[0-9]{16}$/.test(cardNumber);

  const generatePDF = (purchaseData, fullName) => {
    const doc = new jsPDF();

    // Set font size and styles for header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Baker's Basket", 105, 20, null, null, "center"); 
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.text("Bake Your Dreams, Taste the Love", 105, 30, null, null, "center"); 

    // Purchase Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 50);
    doc.text(`Invoice Number: ${Math.floor(Math.random() * 1000000)}`, 10, 60);
    doc.text(`Customer Name: ${fullName}`, 10, 70); 

    // Address Details
    doc.setFont("helvetica", "bold");
    doc.text("Billing Address:", 10, 90);
    doc.setFont("helvetica", "normal");
    doc.text(`${address}`, 10, 100);
    doc.text(`${city}, ${province}, ${postalCode}`, 10, 110);
    doc.text(`${country}`, 10, 120);

    // Table Header
    doc.setFont("helvetica", "bold");
    doc.text("Product Name", 10, 140);
    doc.text("Quantity", 100, 140);
    doc.text("Total Amount", 150, 140);

    // Line under the table header
    doc.line(10, 142, 200, 142);

    // Table Rows
    doc.setFont("helvetica", "normal");
    purchaseData.forEach((purchase, index) => {
      const yPosition = 150 + index * 10;
      doc.text(purchase.productName, 10, yPosition);
      doc.text(purchase.quantity.toString(), 100, yPosition);
      doc.text(`$${purchase.totalAmount.toFixed(2)}`, 150, yPosition);
    });

    // Total Amount at the bottom
    const totalAmount = purchaseData.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );
    doc.setFont("helvetica", "bold");
    doc.text("Total:", 140, 150 + purchaseData.length * 10);
    doc.text(`$${totalAmount.toFixed(2)}`, 150, 150 + purchaseData.length * 10);

    // Footer - Thank you message
    doc.setFont("helvetica", "italic");
    doc.text(
      "Thank you for your purchase!",
      105,
      170 + purchaseData.length * 10,
      null,
      null,
      "center"
    );

    // Save the PDF
    doc.save("purchase_confirmation.pdf");
  };

  const handlePurchase = async () => {
    if (
      !fullName ||
      !address ||
      !city ||
      !province ||
      !postalCode ||
      !cardDetails ||
      !cvv ||
      !expiryDate
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateCvv(cvv)) {
      alert("Please enter a valid 3-digit CVV.");
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      alert(
        "Please enter a valid expiry date in MM/YY format, and ensure it's in the future."
      );
      return;
    }

    if (!validateCardNumber(cardDetails)) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }

    try {
      if (!state || !state.items) {
        throw new Error("No cart items found.");
      }

      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        throw new Error("User not found.");
      }

      // Create the address string
      const fullAddress = `${address}, ${city}, ${province}, ${postalCode}, ${country}`;

      // Call the checkoutCart mutation
      const { data } = await checkoutCart({
        variables: {
          userId,
          address: fullAddress,
          cardDetails,
          status: "ordered",
        },
      });

      console.log("Purchase confirmed:", data);
      alert("Purchase confirmed!");

      // Generate PDF with fullName
      generatePDF(data.checkoutCart, fullName);

      navigate("/confirmation");
    } catch (err) {
      console.error("Error confirming purchase:", err);
      alert("Failed to confirm purchase. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5 d-flex justify-content-center">
        <div className="col-md-6 col-lg-5">
          <h2 className="text-center display-4 mb-4">Shipping Details</h2>
          <div className="card p-4 shadow-sm">
            <form>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
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
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
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
                <div className="col-md-6 mb-3">
                  <label htmlFor="province" className="form-label">
                    Province
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="province"
                    placeholder="Enter your province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">
                  Postal Code
                </label>
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
                <label htmlFor="cardDetails" className="form-label">
                  Card Details
                </label>
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
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    placeholder="Enter CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="expiryDate" className="form-label">
                    Expiry Date (MM/YY)
                  </label>
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
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePurchase}
              >
                Confirm Purchase
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPurchase;
