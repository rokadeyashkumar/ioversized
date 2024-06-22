// src/api/productApi.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/add`, product);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || error.message);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message || error.message);
  }
};
