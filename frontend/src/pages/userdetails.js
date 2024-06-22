import React, { useEffect, useState } from 'react';
import { getAllCustomers } from '../services/customerService';

const UserDetails = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>User Details</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.dob}</td>
              <td>{customer.email}</td>
              <td>{customer.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
