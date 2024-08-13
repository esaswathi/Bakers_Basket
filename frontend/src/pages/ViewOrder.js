import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GET_VENDOR_ORDERS = gql`
  query getVendorOrders($vendorId: ID!) {
    ordersByVendor(vendorId: $vendorId) {  
      id
      address
      cardDetails
      totalAmount
      productId
      productName
      vendorId
      purchaseDate
      quantity
      status
    }
  }
`;

const UPDATE_ORDER_STATUS = gql`
  mutation updateOrderStatus($orderId: ID!, $status: String!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      id
      status
    }
  }
`;

const ViewOrder = () => {
  const vendorId = sessionStorage.getItem("userId");
  const { data, loading, error } = useQuery(GET_VENDOR_ORDERS, {
    variables: { vendorId },
  });
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({
        variables: { orderId, status: newStatus },
        refetchQueries: [{ query: GET_VENDOR_ORDERS, variables: { vendorId } }],
      });
      alert("Order status updated successfully.");
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update order status. Please try again.");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  return (
    <div>
      <Navbar />
      <div className="container my-5" id="contentSection">
      <h2 className="text-center mb-4 display-4"> View Orders </h2>
        <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.ordersByVendor.length > 0 ? (
                  data.ordersByVendor.map((order) => (
                    <tr key={order.id}>
                      <td>{order.productName}</td>
                      <td>{order.address}</td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                      <td>{order.status}</td>
                      <td>
                        <select
                          value={order.status}
                          className="form-select"
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processed">Processed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
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

export default ViewOrder;
