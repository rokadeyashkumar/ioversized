import React, { useState, useEffect } from 'react';
import './style/orderdetails.scss';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // Fetch orders from the backend and set state
    // setOrders(response.data);
  };

  const handleAddTrackingId = async (orderId, trackingId) => {
    // Add tracking ID to order logic
    // After adding, refresh the order list
    // fetchOrders();
  };

  return (
    <section className="order-details">
      <h2>Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Payment Details</th>
            <th>Product Details</th>
            <th>Size</th>
            <th>Color</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Tracking ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.customerName}</td>
              <td>{order.address}</td>
              <td>{order.paymentDetails}</td>
              <td>{order.productDetails}</td>
              <td>{order.size}</td>
              <td>{order.color}</td>
              <td>{order.productName}</td>
              <td>{order.price}</td>
              <td>
                <input
                  type="text"
                  value={selectedOrder === order._id ? order.trackingId : ''}
                  onChange={(e) => setSelectedOrder(order._id) && handleAddTrackingId(order._id, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleAddTrackingId(order._id, selectedOrder.trackingId)}>Add Tracking ID</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default OrderDetails;
