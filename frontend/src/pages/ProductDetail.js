import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/style.css";

const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      stocks
      category
      image
      vendorId
    }
  }
`;

const ADD_TO_CART = gql`
  mutation addToCart($userId: ID!, $productId: ID!, $vendorId: ID!, $quantity: Int!) {
    addToCart(userId: $userId, productId: $productId, vendorId: $vendorId, quantity: $quantity) {
      id
      userId
      productId {
        id
        name
        price
      }
      vendorId
      quantity
      addedAt
    }
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id },
  });
  const [quantity, setQuantity] = useState(1);
  const [errorspan, setErrorspan] = useState(false);
  const [addToCart] = useMutation(ADD_TO_CART);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching product details:", error);
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.product) {
    return <p>Product not found</p>;
  }

  const product = data.product;

  const handleAddToCart = async (productId, vendorId, quantity) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    console.log("Adding to cart with quantity:", quantity);

    try {
      await addToCart({ variables: { userId, productId, vendorId, quantity } });
      alert("Product added to cart!");
      navigate("/products");
    } catch (err) {
      console.error("Error adding product to cart:", err);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  const handleQuantityChange = (increment) => {
    setErrorspan(false);
    if (increment === 1) {
      if (product.stocks > quantity) {
        setQuantity((prevQuantity) => {
          const newQuantity = prevQuantity + increment;
          return newQuantity > 0 ? newQuantity : 1;
        });
      } else {
        setErrorspan(true);
      }
    } else {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + increment;
        return newQuantity > 0 ? newQuantity : 1;
      });
    }
  };

  const handleBuy = () => {
    const state = {
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      vendorId: product.vendorId,
      quantity,
      totalPrice: product.price * quantity,
    };
    navigate(`/purchase/${product.id}`, { state });
  };

  const totalPrice = product.price * quantity;

  const formatDescription = (description) => {
    const [mainDescription, ingredientsText, weightText] = description.split("|");
    return (
      <>
        <p>{mainDescription.trim()}</p>
        {ingredientsText && (
          <p>
            <strong>Ingredients: </strong>{ingredientsText.trim()}
          </p>
        )}
        {weightText && (
          <p>
            <strong>Weight: </strong>{weightText.trim()}
          </p>
        )}
      </>
    );
  };

  return (
    <div>
      <Navbar />

      <div
        className="alert alert-danger mt-3 mx-3"
        role="alert"
        style={{ display: errorspan ? "block" : "none" }}
      >
        Quantity cannot be greater than stocks
      </div>

      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <img
              src={product.image}
              className="img-fluid shadow rounded"
              style={{ maxWidth: "100%", height: "auto" }}
              alt={product.name}
            />
          </div>
          <div className="col-12 col-md-6 mt-4 mt-md-0">
            <div className="d-flex flex-column justify-content-between h-100 mx-2">
              <div>
                <h3 className="mb-3 fw-bold text-center display-5 text-lg-start text-md-start">
                  {product.name}
                </h3>
                {formatDescription(product.description)} {/* Call to formatDescription */}
                <p className="fs-4 mb-3">
                  Price: <span>${product.price.toFixed(2)}</span>
                </p>
                <div className="d-flex justify-content-between mb-2 fs-5">
                  <p>
                    Stocks: <span className="me-2">{product.stocks}</span>
                  </p>
                  <div className="d-flex align-items-center mb-3">
                    <button
                      className="btn btn-dark me-2"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity mx-3 fs-4">{quantity}</span>
                    <button
                      className="btn btn-dark me-2"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stocks}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <p className="mb-3 fs-5">
                  Total Price:{" "}
                  <span className="fw-bold text-dark">
                    ${totalPrice.toFixed(2)}
                  </span>
                </p>
                <button
                  className="btn btn-warning"
                  onClick={() => handleAddToCart(product.id, product.vendorId, quantity)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-warning ms-3"
                  onClick={handleBuy}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
