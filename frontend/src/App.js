import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import HomePage from './pages/homepage';
import ProductPage from './pages/productpage';
import CartPage from './pages/cartpage';
import CheckoutPage from './pages/checkoutpage';
import AdminLoginPage from './pages/adminloginpage';
import AdminDashboardPage from './pages/admindashboardpage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';

import { AuthContextProvider } from './contexts/authcontext';
import CartContextProvider from './contexts/cartcontext';
import './pages/admindashboardpage.scss';
import './App.css';
import './admin.scss';

function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin/" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard/*" element={<AdminDashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <Footer />
        </Router>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
