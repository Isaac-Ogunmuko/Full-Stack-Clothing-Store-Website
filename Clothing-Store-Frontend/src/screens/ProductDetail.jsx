import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Accordion toggle states
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`https://clothing-store-backend-4z5g.onrender.com/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        // Fallback fetch all
        fetch('https://clothing-store-backend-4z5g.onrender.com/api/products')
          .then(res => res.json())
          .then(allProducts => {
            const found = allProducts.find(p => (p._id === id || p.id === id));
            if (found) {
              setProduct(found);
            } else {
              setError("Product not found");
            }
            setLoading(false);
          })
          .catch(() => {
            setError("Product not found");
            setLoading(false);
          });
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Retrieve existing cart from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    const cartItemId = product._id || product.id;
    const existingIndex = existingCart.findIndex(item => (item._id === cartItemId || item.id === cartItemId));

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity = (existingCart[existingIndex].quantity || 1) + 1;
    } else {
      existingCart.push({
        ...product,
        id: cartItemId,
        quantity: 1,
        price: Number(product.price)
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    
    // Trigger custom event so header cart counters update instantly if applicable
    window.dispatchEvent(new Event('storage'));

    // Redirect straight to cart page
    navigate('/cart');
  };

  if (loading) {
    return <div style={{ padding: "160px 30px", textAlign: "center", fontSize: "16px", color: "#666" }}>Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div style={{ padding: "160px 30px", textAlign: "center" }}>
        <h2 style={{ fontSize: "24px", color: "#111", marginBottom: "15px" }}>Product not found.</h2>
        <Link to="/items" style={{ color: "#000", textDecoration: "underline", fontWeight: "bold" }}>Back to Shop Catalog</Link>
      </div>
    );
  }

  const productName = product.name || product.title;
  const primaryImage = product.image || (product.images && product.images.length > 0 ? product.images[0] : null);
  const price = Number(product.price || 0);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "140px 30px 60px 30px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "1200px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "60px", alignItems: "start" }}>
        
        {/* Left Column: Product Image */}
        <div style={{ width: "100%", height: "550px", backgroundColor: "#f9f9f9", borderRadius: "12px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #eaeaea" }}>
          {primaryImage ? (
            <img src={primaryImage} alt={productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span>No Image Available</span>
          )}
        </div>

        {/* Right Column: Product Info & Etsy-style Sections */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          
          <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
            EluxFashion • Ships from Yonkers, NY
          </span>

          <h1 style={{ fontSize: "26px", fontWeight: "bold", color: "#111", marginBottom: "15px", lineHeight: "1.3" }}>
            {productName}
          </h1>

          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
            <span style={{ fontSize: "28px", fontWeight: "bold", color: "#111" }}>${price.toFixed(2)}</span>
            <span style={{ fontSize: "13px", color: "#00a651", fontWeight: "600", backgroundColor: "#e6f4ea", padding: "4px 8px", borderRadius: "4px" }}>
              FREE shipping
            </span>
          </div>

          <button 
            onClick={handleAddToCart}
            style={{ 
              backgroundColor: "#222", 
              color: "#fff", 
              padding: "16px", 
              borderRadius: "24px", 
              border: "none", 
              textTransform: "uppercase", 
              fontWeight: "bold", 
              letterSpacing: "1px", 
              cursor: "pointer", 
              width: "100%", 
              marginBottom: "30px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "background 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#000"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#222"}
          >
            Add to cart
          </button>

          {/* Item Details Accordion Section */}
          <div style={{ borderTop: "1px solid #eaeaea", padding: "15px 0" }}>
            <div 
              onClick={() => setDetailsOpen(!detailsOpen)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: "bold", fontSize: "15px", color: "#111" }}
            >
              <span>Item details</span>
              <span>{detailsOpen ? "−" : "+"}</span>
            </div>
            
            {detailsOpen && (
              <div style={{ marginTop: "12px", fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
                <p style={{ marginBottom: "10px" }}><strong>Highlights:</strong> Made by EluxFashion • Materials: {product.category || "Premium Fabric"}</p>
                <p style={{ marginBottom: "10px" }}>{product.description || "High-quality African fashion material, perfect for custom tailoring, traditional weddings, and special events."}</p>
                <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
                  <li>Size: Standard 5 Yards</li>
                  <li>Care instructions: Dry clean or hand wash gently.</li>
                </ul>
                <p style={{ fontSize: "12px", color: "#777", fontStyle: "italic" }}>Color may look slightly different depending on your monitor settings.</p>
              </div>
            )}
          </div>

          {/* Shipping and Return Policies Accordion Section */}
          <div style={{ borderTop: "1px solid #eaeaea", borderBottom: "1px solid #eaeaea", padding: "15px 0" }}>
            <div 
              onClick={() => setShippingOpen(!shippingOpen)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: "bold", fontSize: "15px", color: "#111" }}
            >
              <span>Shipping and return policies</span>
              <span>{shippingOpen ? "−" : "+"}</span>
            </div>

            {shippingOpen && (
              <div style={{ marginTop: "12px", fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
                <p style={{ marginBottom: "8px" }}>📦 <strong>Shipping:</strong> Usually ships within 1 business day from Yonkers, New York.</p>
                <p style={{ marginBottom: "8px" }}>🔄 <strong>Returns & Exchanges:</strong> Accepted within 30 days of delivery. Buyer is responsible for return shipping costs.</p>
                <p style={{ fontSize: "12px", color: "#777" }}>Please reach out if you have any questions or custom inquiries!</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}