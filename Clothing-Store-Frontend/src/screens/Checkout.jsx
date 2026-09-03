import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Receive cart items and total amount passed from Cart.jsx
  const { cartItems = [], totalAmount = 0 } = location.state || {};

  const [formData, setFormData] = useState({
    email: '',
    shippingAddress: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        email: formData.email,
        shippingAddress: formData.shippingAddress,
        products: cartItems.map(item => ({
          product: item.id,
          quantity: item.quantity
        })),
        totalAmount: totalAmount
      };

      const response = await fetch('http://localhost:8000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Clear local storage cart upon successful order
        localStorage.removeItem('cartItems');
        setOrderSuccess(true);
      } else {
        setError(data.errors ? data.errors.map(err => err.msg).join(', ') : (data.error || "Failed to process order."));
      }
    } catch (err) {
      console.error("Checkout submission error:", err);
      setError("Network error. Please ensure your backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div style={{ backgroundColor: "#ffffff", color: "#222222", minHeight: "100vh", padding: "140px 30px 60px 30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: "600px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "40px", borderRadius: "8px", textAlign: "center", color: "#166534" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>Payment & Order Successful!</h2>
          <p style={{ fontSize: "14px", marginBottom: "24px" }}>Thank you for your purchase with Elux Fashion. Your order has been placed successfully and inventory has been updated.</p>
          <Link to="/items" style={{ padding: "12px 24px", backgroundColor: "#121212", color: "#fff", borderRadius: "20px", textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#222222", minHeight: "100vh", padding: "140px 30px 60px 30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "900px" }}>
        
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#121212", marginBottom: "30px" }}>Checkout</h1>

        {error && (
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", padding: "12px 20px", borderRadius: "6px", color: "#dc2626", marginBottom: "20px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", alignItems: "start" }}>
          
          {/* LEFT: Contact & Shipping Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "#f9f9f9", padding: "25px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", borderBottom: "1px solid #e5e7eb", paddingBottom: "12px" }}>Shipping Information</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600" }}>Email Address</label>
              <input 
                type="email" 
                name="email" 
                required 
                value={formData.email} 
                onChange={handleChange}
                placeholder="you@example.com"
                style={{ padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", backgroundColor: "#fff" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600" }}>Shipping Address</label>
              <textarea 
                name="shippingAddress" 
                required 
                rows="3"
                value={formData.shippingAddress} 
                onChange={handleChange}
                placeholder="123 Main St, City, State, Zip Code"
                style={{ padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", backgroundColor: "#fff", resize: "vertical" }}
              />
            </div>
          </div>

          {/* RIGHT: Payment Details & Summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "#f9f9f9", padding: "25px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", borderBottom: "1px solid #e5e7eb", paddingBottom: "12px" }}>Payment Details</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: "600" }}>Card Number</label>
              <input 
                type="text" 
                name="cardNumber" 
                required 
                maxLength="19"
                value={formData.cardNumber} 
                onChange={handleChange}
                placeholder="4111 2222 3333 4444"
                style={{ padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", backgroundColor: "#fff" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "600" }}>Expiration</label>
                <input 
                  type="text" 
                  name="expiryDate" 
                  required 
                  maxLength="5"
                  value={formData.expiryDate} 
                  onChange={handleChange}
                  placeholder="MM/YY"
                  style={{ padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", backgroundColor: "#fff" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "600" }}>CVV</label>
                <input 
                  type="password" 
                  name="cvv" 
                  required 
                  maxLength="4"
                  value={formData.cvv} 
                  onChange={handleChange}
                  placeholder="123"
                  style={{ padding: "12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", backgroundColor: "#fff" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "bold", borderTop: "1px solid #e5e7eb", paddingTop: "15px", marginTop: "5px" }}>
              <span>Total Due:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: "#121212", color: "#ffffff", padding: "16px", borderRadius: "30px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer", textTransform: "uppercase", marginTop: "10px", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}