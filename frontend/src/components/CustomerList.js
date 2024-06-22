// frontend/src/components/CustomerList.js
import React, { useEffect, useState } from 'react';
import { getAllCustomers } from '../services/customerService';

const CustomerList = () => {
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
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.name} - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
