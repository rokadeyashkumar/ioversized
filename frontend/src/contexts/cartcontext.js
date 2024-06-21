// frontend/src/contexts/cartcontext.js

import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  // Define state and functions related to cart management
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // Implement logic to add item to cart
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId) => {
    // Implement logic to remove item from cart
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };

  // Value object containing state and functions to be consumed by child components
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  // Provide the context value to its children
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider; // Ensure CartContextProvider is exported as default
