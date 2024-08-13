import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import productImage from "../assets/images/user_banner.jpeg";
import "../assets/css/style.css";

const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $price: Float!
    $stocks: Int!
    $category: String!
    $image: String!
    $zipCode: String!
    $vendorId: ID!
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      stocks: $stocks
      category: $category
      image: $image
      zipCode: $zipCode
      vendorId: $vendorId
    ) {
      id
      name
      description
      price
      stocks
      category
      image
      zipCode
      vendorId
    }
  }
`;

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stocks, setStocks] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [addProduct, { loading, error }] = useMutation(ADD_PRODUCT);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorspan, setErrorspan] = useState(false);

  // Retrieve vendorId from session storage
  const vendorId = sessionStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64Image = reader.result;
        await addProduct({
          variables: {
            name,
            description,
            price: parseFloat(price),
            stocks: parseInt(stocks),
            category,
            image: base64Image,
            zipCode,
            vendorId,
          },
        });
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
          navigate("/addProduct"); // Redirect to the same page
        }, 2000);
        setName("");
        setDescription("");
        setPrice("");
        setStocks("");
        setCategory("");
        setImage(null);
        setZipCode("");
      };
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  return (
    <div>
      <Navbar />

      <div
        className="alert alert-danger mt-5 ml-3 mr-3"
        role="alert"
        style={{ display: errorspan ? "block" : "none" }}
      >
        Quantity cannot be greater than stocks
      </div>

      {successMessage && (
        <div className="alert alert-success mt-5 ml-3 mr-3" role="alert">
          Product added successfully!
        </div>
      )}

      <div
        id="productBannerImage"
        className="d-flex justify-content-center align-items-center min-vh-100 bg-cover"
        style={{
          backgroundImage: `url(${productImage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="container mt-5">
          <div
            className="card bg-light text-dark p-4 mb-5"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <h2 className="card-title text-center m-3 display-5">
              {" "}
              Hey Baker!
            </h2>
            <span className="text-center pb-2">
              {" "}
              Do you have a new product to sell?{" "}
            </span>

            {error && (
              <div className="alert alert-danger mt-4">
                Error adding product. Please try again.
              </div>
            )}

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="textarea form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="zipCode" className="form-label">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipCode"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.toUpperCase())}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="stocks" className="form-label">
                      Stocks
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="stocks"
                      value={stocks}
                      onChange={(e) => setStocks(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Dish Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-warning w-100"
                  disabled={loading}
                >
                  {loading ? "Adding Product..." : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
