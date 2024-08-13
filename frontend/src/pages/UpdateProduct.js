import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import productImage from "../assets/images/user_banner.jpeg";
import "../assets/css/style.css";

const GET_PRODUCT = gql`
  query product($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      stocks
      category
      image
      zipCode
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $name: String!
    $description: String!
    $price: Float!
    $stocks: Int!
    $category: String!
    $image: String!
    $zipCode: String!
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      stocks: $stocks
      category: $category
      image: $image
      zipCode: $zipCode
    ) {
      id
      name
      description
      price
      stocks
      category
      image
      zipCode
    }
  }
`;

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { id } });
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stocks, setStocks] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    if (data) {
      const { product } = data;
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStocks(product.stocks);
      setCategory(product.category);
      setZipCode(product.zipCode);
      setExistingImage(product.image);
    }
  }, [data]);

  if (loading)
    return (
      <p className="alert alert-warning mt-5 ml-3 mr-3" role="alert">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="alert alert-danger mt-5 ml-3 mr-3" role="alert">
        Error: {error.message}
      </p>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let base64Image = existingImage; // Default to existing image

      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
          base64Image = reader.result;
          await updateProduct({
            variables: {
              id,
              name,
              description,
              price: parseFloat(price),
              stocks: parseInt(stocks),
              category,
              image: base64Image,
              zipCode,
            },
          });
          navigate("/ViewProducts");
        };
      } else {
        await updateProduct({
          variables: {
            id,
            name,
            description,
            price: parseFloat(price),
            stocks: parseInt(stocks),
            category,
            image: base64Image, // Use existing image if no new image is provided
            zipCode,
          },
        });
        navigate("/ViewProducts");
      }
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div>{error ? error.message : ""}</div>

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
            <h2 className="card-title text-center pb-2 m-3 display-5">
              Update Product
            </h2>

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
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProduct;
