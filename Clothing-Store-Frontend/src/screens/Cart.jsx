import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
  }, []);

  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return;
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  // Calculate subtotal accurately respecting discounts
  const subtotal = cartItems.reduce((sum, item) => {
    const activePrice = Number(item.discountPrice !== undefined && item.discountPrice !== null && item.discountPrice !== '' ? item.discountPrice : item.price || 0);
    return sum + (activePrice * (item.quantity || 1));
  }, 0);

  const shipping = 0.00; // Free shipping
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate('/checkout'); // Routes to your checkout screen
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "140px 30px 60px 30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111", marginBottom: "30px" }}>
          Your Shopping Cart ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)})
        </h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>Your cart is currently empty.</p>
            <Link to="/items" style={{ backgroundColor: "#000", color: "#fff", padding: "12px 24px", borderRadius: "24px", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "40px", alignItems: "start" }}>
            
            {/* Cart Items List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {cartItems.map((item, index) => {
                const currentPrice = Number(item.discountPrice !== undefined && item.discountPrice !== null && item.discountPrice !== '' ? item.discountPrice : item.price || 0);
                const originalPrice = item.discountPrice ? Number(item.price) : null;
                const hasDiscount = Boolean(originalPrice && originalPrice > currentPrice);

                const rawImg = item.image || (item.images && item.images[0]) || null;
                const itemImage = rawImg 
                  ? (rawImg.startsWith('http') ? rawImg : `${API_URL}${rawImg.startsWith('/') ? '' : '/'}${rawImg}`)
                  : null;

                const itemName = item.name || item.title;

                return (
                  <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", border: "1px solid #eaeaea", borderRadius: "12px", backgroundColor: "#fff" }}>
                    
                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                      <div style={{ width: "90px", height: "90px", backgroundColor: "#f5f5f5", borderRadius: "8px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {itemImage ? (
                          <img src={itemImage} alt={itemName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span style={{ fontSize: "10px", color: "#888" }}>No Image</span>
                        )}
                      </div>

                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#111", marginBottom: "6px" }}>{itemName}</h3>
                        
                        {/* Correct Price / Discount Display */}
                        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "10px" }}>
                          <span style={{ fontSize: "15px", fontWeight: "bold", color: "#111" }}>${currentPrice.toFixed(2)}</span>
                          {hasDiscount && (
                            <span style={{ fontSize: "13px", color: "#777", textDecoration: "line-through" }}>${originalPrice.toFixed(2)}</span>
                          )}
                        </div>

                        <button onClick={() => removeItem(index)} style={{ background: "none", border: "none", color: "#d9534f", fontSize: "13px", cursor: "pointer", padding: 0, textDecoration: "underline" }}>
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "20px", padding: "4px 10px", gap: "12px" }}>
                      <button onClick={() => updateQuantity(index, (item.quantity || 1) - 1)} style={{ background: "none", border: "none", fontSize: "16px", cursor: "pointer", fontWeight: "bold" }}>-</button>
                      <span style={{ fontSize: "14px", fontWeight: "600" }}>{item.quantity || 1}</span>
                      <button onClick={() => updateQuantity(index, (item.quantity || 1) + 1)} style={{ background: "none", border: "none", fontSize: "16px", cursor: "pointer", fontWeight: "bold" }}>+</button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Order Summary Box */}
            <div style={{ border: "1px solid #eaeaea", borderRadius: "12px", padding: "25px", backgroundColor: "#f9f9f9" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#111", marginBottom: "20px", borderBottom: "1px solid #eaeaea", paddingBottom: "12px" }}>
                Order Summary
              </h3>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", color: "#555" }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontSize: "14px", color: "#555" }}>
                <span>Shipping</span>
                <span>FREE</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px", fontSize: "18px", fontWeight: "bold", color: "#111", borderTop: "1px solid #eaeaea", paddingTop: "15px" }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button 
                onClick={handleCheckout}
                style={{ backgroundColor: "#000", color: "#fff", padding: "15px", borderRadius: "24px", border: "none", width: "100%", textTransform: "uppercase", fontWeight: "bold", letterSpacing: "1px", cursor: "pointer" }}
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}