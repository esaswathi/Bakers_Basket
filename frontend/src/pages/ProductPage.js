import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/style.css";
import { GoHeart, GoHeartFill } from "react-icons/go";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      stocks
      category
      image
      vendorId
      zipCode
    }
  }
`;

const ADD_TO_CART = gql`
  mutation addToCart(
    $userId: ID!
    $productId: ID!
    $vendorId: ID!
    $quantity: Int!
  ) {
    addToCart(
      userId: $userId
      productId: $productId
      vendorId: $vendorId
      quantity: $quantity
    ) {
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

const ADD_TO_WISHLIST = gql`
  mutation addToWishlist($userId: ID!, $productId: ID!) {
    addToWishlist(userId: $userId, productId: $productId) {
      id
      userId
      productId {
        id
        name
      }
    }
  }
`;

const ProductPage = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [addToCart] = useMutation(ADD_TO_CART);
  const [addToWishlist] = useMutation(ADD_TO_WISHLIST);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching products:", error);
    return <p>Error: {error.message}</p>;
  }

  const handleDetails = (productId) => {
    navigate(`/productsdetail/${productId}`);
  };

  const handleAddToCart = async (productId, vendorId) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      await addToCart({
        variables: { userId, productId, vendorId, quantity: 1 },
      });
      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding product to cart:", err);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  const handleAddToWishlist = async (productId) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to add items to the wishlist.");
      return;
    }

    try {
      const { data } = await addToWishlist({
        variables: { userId, productId },
      });
      if (data.addToWishlist) {
        alert("Product added to wishlist!");
      } else {
        throw new Error("Failed to add product to wishlist.");
      }
    } catch (err) {
      console.error("Error adding product to wishlist:", err);
      alert("Product added to wishlist!");
    }
  };

  // Apply filters
  const filteredProducts = data.products.filter((product) => {
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice =
      (!minPrice || product.price >= parseFloat(minPrice)) &&
      (!maxPrice || product.price <= parseFloat(maxPrice));
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesZipCode = !zipCode || product.zipCode === zipCode;

    return (
      matchesSearchTerm && matchesPrice && matchesCategory && matchesZipCode
    );
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get unique categories for the dropdown
  const categories = [
    ...new Set(data.products.map((product) => product.category)),
  ];

  // Clear filters function
  const clearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
    setZipCode("");
    setCurrentPage(1);
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center mb-3 pb-5 display-3">
          Explore the Taste of <GoHeartFill className="text-warning" />
        </h1>
        <div className="row">
          {/* Filter Section */}
          <div className="col-12 col-md-4 col-lg-3 my-3 mb-md-0">
            <h3 className="text-center text-md-start">Filter</h3>
            <div className="border p-3">
              <h5>Search</h5>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search for a product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <h5>Price</h5>
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <h5>Category</h5>
              <select
                className="form-control mb-3"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <h5>ZIP Code</h5>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter ZIP code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              {/* Clear Filters Button */}
              <button
                className="btn btn-dark w-100 mt-3"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="col-12 col-md-8 col-lg-9">
            <div className="row">
              {currentProducts.length === 0 ? (
                <p>Sorrt, No products found for this ZIP code and filters. Please try again later.</p>
              ) : (
                currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="col-12 col-sm-6 col-md-4 mb-4"
                  >
                    <div className="card">
                      <img
                        src={product.image}
                        className="card-img-top img-fluid"
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5
                            className="card-title mb-0"
                            style={{ display: "inline" }}
                          >
                            {product.name}
                          </h5>
                          <button
                            className="btn text-danger"
                            onClick={() => handleAddToWishlist(product.id)}
                          >
                            <strong>
                              <GoHeart />
                            </strong>
                          </button>
                        </div>
                        <p className="card-text">Price: ${product.price}</p>
                        <button
                          className="btn btn-warning mt-2"
                          onClick={() => handleDetails(product.id)}
                        >
                          Details
                        </button>
                        <button
                          className="btn btn-warning ms-3 mt-2"
                          onClick={() =>
                            handleAddToCart(product.id, product.vendorId)
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-center">
                {Array.from(
                  { length: Math.ceil(filteredProducts.length / perPage) },
                  (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`page-link ${
                          currentPage === index + 1
                            ? "bg-warning text-dark"
                            : ""
                        }`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
