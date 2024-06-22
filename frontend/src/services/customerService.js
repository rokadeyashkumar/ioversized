// frontend/src/services/customerService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getAllCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer:', error);
    throw error;
  }
};
