import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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
      .catch(() => {
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
  
  let imagesList = [];
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    imagesList = product.images;
  } else if (product.image) {
    imagesList = [product.image, product.image, product.image];
  }

  const activeImage = imagesList[selectedImageIndex] || imagesList[0] || product.image || null;

  // Pricing & Admin Discount Fields Support
  const currentPrice = Number(product.price || product.salePrice || 0);
  const originalPrice = product.originalPrice || product.comparePrice || (product.discount ? currentPrice * 1.3 : null);
  const hasDiscount = Boolean(originalPrice && originalPrice > currentPrice);
  const discountPercent = hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : null;

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const cartItemId = product._id || product.id;
    const existingIndex = existingCart.findIndex(item => (item._id === cartItemId || item.id === cartItemId));

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity = (existingCart[existingIndex].quantity || 1) + 1;
    } else {
      existingCart.push({
        ...product,
        id: cartItemId,
        image: activeImage,
        quantity: 1,
        price: currentPrice
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('storage'));
    navigate('/cart');
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "140px 30px 60px 30px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "1300px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "50px", alignItems: "start" }}>
        
        {/* Left Side: Etsy Gallery Layout */}
        <div style={{ display: "flex", gap: "15px", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "70px" }}>
            {imagesList.map((imgUrl, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                style={{
                  width: "70px",
                  height: "80px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: selectedImageIndex === idx ? "2px solid #111" : "1px solid #ddd",
                  cursor: "pointer",
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: selectedImageIndex === idx ? 1 : 0.6,
                  transition: "all 0.2s"
                }}
              >
                <img src={imgUrl} alt={`Thumbnail ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <div style={{ flex: 1, height: "550px", backgroundColor: "#f9f9f9", borderRadius: "10px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #eaeaea", position: "relative" }}>
            {activeImage ? (
              <img src={activeImage} alt={productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span>No Image Available</span>
            )}
          </div>
        </div>

        {/* Right Side: Product Info & Discounts */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
            EluxFashion • Ships from Yonkers, NY
          </span>

          <h1 style={{ fontSize: "26px", fontWeight: "bold", color: "#111", marginBottom: "15px", lineHeight: "1.3" }}>
            {productName}
          </h1>

          <div style={{ marginBottom: "20px" }}>
            {hasDiscount ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                  <span style={{ fontSize: "26px", fontWeight: "bold", color: "#111" }}>Now ${currentPrice.toFixed(2)}</span>
                  <span style={{ fontSize: "18px", color: "#777", textDecoration: "line-through" }}>${Number(originalPrice).toFixed(2)}</span>
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#d9534f", fontWeight: "bold", backgroundColor: "#fdf2f2", padding: "3px 8px", borderRadius: "4px" }}>
                    {discountPercent}% off • Sale ends soon
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#111" }}>
                ${currentPrice.toFixed(2)}
              </div>
            )}
            
            <div style={{ marginTop: "8px" }}>
              <span style={{ fontSize: "13px", color: "#00a651", fontWeight: "600", backgroundColor: "#e6f4ea", padding: "4px 8px", borderRadius: "4px" }}>
                FREE shipping
              </span>
            </div>
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
          >
            Add to cart
          </button>

          {/* Item Details */}
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
              </div>
            )}
          </div>

          {/* Shipping Policies */}
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
                <p style={{ marginBottom: "8px" }}>🔄 <strong>Returns & Exchanges:</strong> Accepted within 30 days of delivery.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}