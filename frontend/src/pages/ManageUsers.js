import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Table, Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { MdDelete } from "react-icons/md";
import "../assets/css/style.css";
import Footer from "../components/Footer";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
      role
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
    }
  }
`;

const ManageUsers = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDelete = async (id) => {
    try {
      await deleteUser({ variables: { id } });
      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <h1 className="text-center mb-4 display-4">Manage Users</h1>
        <p className="text-center mb-4">
          Here you can view and manage user accounts.
        </p>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                    className="d-flex align-items-center"
                  >
                    <MdDelete className="me-1" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer/>
    </div>
  );
};

export default ManageUsers;
