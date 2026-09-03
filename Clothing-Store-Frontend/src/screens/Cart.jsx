import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on mount (populated when clicking "Add to Cart" on a product)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [
      // Fallback sample item if localStorage is empty
      {
        id: 1,
        name: "Test Lace",
        price: 24.00,
        quantity: 1,
        image: "/SwissLace(1).jfif"
      }
    ];
    setCartItems(savedCart);
  }, []);

  // Update quantity and sync with localStorage
  const updateQuantity = (id, delta) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);

    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 0 ? 15.00 : 0;
  const totalAmount = subtotal + shippingCost;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout', { state: { cartItems, totalAmount } });
  };

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#222222", minHeight: "100vh", padding: "140px 30px 60px 30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#121212", marginBottom: "30px" }}>Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>Your cart is currently empty.</p>
            <Link to="/items" style={{ padding: "12px 24px", backgroundColor: "#121212", color: "#fff", borderRadius: "20px", textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "40px", alignItems: "start" }}>
            
            {/* LEFT: Cart Items List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: "20px", padding: "20px", border: "1px solid #e5e7eb", borderRadius: "8px", alignItems: "center" }}>
                  <div style={{ width: "90px", height: "100px", backgroundColor: "#f3f4f6", borderRadius: "6px", overflow: "hidden", flexShrink: 0 }}>
                    <img src={item.image || "/SwissLace(1).jfif"} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#121212", marginBottom: "6px" }}>{item.name}</h3>
                    <p style={{ fontSize: "14px", fontWeight: "bold", color: "#16a34a" }}>${item.price.toFixed(2)}</p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #d1d5db", borderRadius: "6px", padding: "4px 8px" }}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>-</button>
                    <span style={{ fontSize: "14px", fontWeight: "600", width: "20px", textAlign: "center" }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>+</button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Order Summary Card */}
            <div style={{ backgroundColor: "#f9f9f9", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "25px", display: "flex", flexDirection: "column", gap: "15px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", borderBottom: "1px solid #e5e7eb", paddingBottom: "12px" }}>Order Summary</h3>
              
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555" }}>
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "bold", color: "#121212", borderTop: "1px solid #e5e7eb", paddingTop: "12px" }}>
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>

              <button 
                onClick={handleCheckout} 
                style={{ backgroundColor: "#121212", color: "#ffffff", padding: "16px", borderRadius: "30px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer", textTransform: "uppercase", marginTop: "10px" }}
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