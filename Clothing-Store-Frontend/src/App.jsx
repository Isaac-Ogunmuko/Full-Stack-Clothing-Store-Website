import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import ItemListing from './screens/ItemListing';
import Review from './screens/Review';
import ProductDetail from './screens/ProductDetail';
import Contact from './screens/Contact';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout'; // <-- Newly added Checkout screen

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items/:category?" element={<ItemListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> {/* <-- Newly added Checkout route */}
      </Routes>
    </Router>
  );
}