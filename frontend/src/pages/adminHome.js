import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import { FaUsers, FaFileAlt, FaBoxOpen } from "react-icons/fa"; 
import "../assets/css/style.css";

const AdminHome = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5" id="contentSection">
        <h1 className="text-center mb-3 pb-3 display-3">Admin Dashboard</h1>
        <p className="text-center mb-4 offset-md-2 col-md-8">
          Welcome to your admin dashboard! Here, you can manage users, view
          reports, and oversee product listings. <br />
          Use the options below to navigate efficiently.
        </p>

        {/* Admin Management Section */}
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <FaUsers
                  className="text-warning my-2"
                  style={{ fontSize: "3rem" }}
                />
                <Card.Title>Manage Users</Card.Title>
                <Card.Text>
                  Manage user accounts, roles, and permissions.
                </Card.Text>
                <Button variant="dark" href="/manage-users">
                  Go to Manage Users
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <FaFileAlt
                  className="text-warning my-2"
                  style={{ fontSize: "3rem" }}
                />
                <Card.Title>View Reports</Card.Title>
                <Card.Text>Generate and view various reports.</Card.Text>
                <Button variant="dark" href="/reports">
                  Go to View Reports
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <FaBoxOpen
                  className="text-warning my-2"
                  style={{ fontSize: "3rem" }}
                />
                <Card.Title>Manage Products</Card.Title>
                <Card.Text>View and manage product listings.</Card.Text>
                <Button variant="dark" href="/AdminManageProduct">
                  Go to Manage Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminHome;
