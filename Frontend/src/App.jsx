import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import ItemListing from './screens/ItemListing';
import Review from './screens/Review';
import About from './screens/About';
import Policies from './screens/Policies';
import Contact from './screens/Contact';
import Shop from './screens/Shop'; // If this handles your checkout/cart screen

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<ItemListing />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/about" element={<About />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Shop />} />
      </Routes>
    </Router>
  );
}
