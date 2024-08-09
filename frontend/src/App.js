import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Products from './pages/products';
import ProductDetail from './pages/productDetail'; // Import the ProductDetail component
import Login from './pages/login';
import Admin from './pages/admin';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Error from './pages/error';
import Otp from './pages/otp';
import Headers from './components/headers';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/user/otp" element={<Otp />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
