import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Table, Button, Container, Alert } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      zipCode
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const AdminManageProduct = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

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

  if (loading)
    return (
      <div className="text-center mt-5">
        <p>Loading products, please wait...</p>
      </div>
    );
  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct({ variables: { id } });
    }
  };

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <h1 className="text-center mb-3 pb-3 display-3">Manage Products</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stocks</th>
              <th>Category</th>
              <th>Image</th>
              <th>ZIP Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{formatDescription(product.description)}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stocks}</td>
                <td>{product.category}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>{product.zipCode}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
};

export default AdminManageProduct;
