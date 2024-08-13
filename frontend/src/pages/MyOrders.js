import React from "react";
import { useQuery, gql } from "@apollo/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GET_USER_ORDERS = gql`
  query getUserOrders($userId: ID!) {
    ordersByUser(userId: $userId) {
      id
      productName
      address
      totalAmount
      status
      purchaseDate
    }
  }
`;

const MyOrders = () => {
  const userId = sessionStorage.getItem("userId"); 
  const { data, loading, error } = useQuery(GET_USER_ORDERS, {
    variables: { userId },
  });

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p>Error loading your orders.</p>;

  return (
    <div>
      <Navbar />
      <div className="container my-5" id="contentSection">
      <h2 className="text-center display-4 mb-4">My Orders</h2>
        <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {data.ordersByUser.length > 0 ? (
                  data.ordersByUser.map((order) => (
                    <tr key={order.id}>
                      <td>{order.productName}</td>
                      <td>{order.address}</td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                      <td>{order.status}</td>
                      <td>
                        {(() => {
                          const timestamp = parseInt(order.purchaseDate, 10);
                          const date = new Date(timestamp);
                          return isNaN(date.getTime()) ? "Date not available" : date.toLocaleDateString();
                        })()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No orders available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;
