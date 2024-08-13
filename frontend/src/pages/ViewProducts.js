import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Card, Col, Row } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../assets/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const GET_PRODUCTS_BY_VENDOR = gql`
  query productsByVendor($vendorId: ID!) {
    productsByVendor(vendorId: $vendorId) {
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

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const ViewProducts = () => {
  const vendorId = sessionStorage.getItem("userId");
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_BY_VENDOR, {
    variables: { vendorId },
    fetchPolicy: "network-only", 
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refetch(); 
  }, [refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Function to format the description
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

  const handleDelete = async (id) => {
    try {
      await deleteProduct({ variables: { id } });
      setModalMessage("Product deleted successfully");
      setShowModal(true);
      refetch(); 
    } catch (err) {
      setModalMessage("Error deleting product");
      setShowModal(true);
      console.error("Error deleting product", err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateProduct/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5" id="contentSection">
        <h2 className="text-center mb-4 display-4"> Manage Your Menu </h2>
        <div className="d-none d-md-block">
          {/* Table view for larger screens */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th className="pe-3">Description</th>
                <th>Price</th>
                <th>Stocks</th>
                <th>Category</th>
                <th>ZIP</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.productsByVendor.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "100px", height: "auto" }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td className="text-justify pe-3">{formatDescription(product.description)}</td>
                  <td>${product.price}</td>
                  <td>{product.stocks}</td>
                  <td>{product.category}</td>
                  <td>{product.zipCode}</td>
                  <td>
                    <button
                      className="btn btn-warning mr-2 mb-1"
                      onClick={() => handleUpdate(product.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger mb-1"
                      onClick={() => handleDelete(product.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-block d-md-none">
          {/* Card view for mobile and tablet */}
          <Row>
            {data.productsByVendor.map((product) => (
              <Col xs={12} sm={12} key={product.id} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={product.image || "placeholder.jpg"}
                    alt={product.name}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{formatDescription(product.description)}</Card.Text>
                    <p>
                      <strong>Price:</strong> ${product.price}
                    </p>
                    <p>
                      <strong>Stocks:</strong> {product.stocks}
                    </p>
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p>
                      <strong>Zip Code:</strong> {product.zipCode}
                    </p>
                    <Button
                      variant="warning"
                      onClick={() => handleUpdate(product.id)}
                      className="mr-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Footer />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewProducts;
