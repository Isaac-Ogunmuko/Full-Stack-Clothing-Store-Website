import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    // Fetch all products or specific product endpoint
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
        console.warn("Direct ID fetch failed, trying fallback search...");
        // Fallback: fetch all and find matching ID in case backend route uses a different parameter name
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
          .catch(e => {
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
  const primaryImage = product.image || (product.images && product.images.length > 0 ? product.images[0] : null);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "140px 30px 60px 30px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "1200px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
        
        {/* Product Image Cube */}
        <div style={{ width: "100%", height: "450px", backgroundColor: "#f5f5f5", borderRadius: "12px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #eaeaea" }}>
          {primaryImage ? (
            <img src={primaryImage} alt={productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span>No Image Available</span>
          )}
        </div>

        {/* Product Info */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111", marginBottom: "15px" }}>{productName}</h1>
          <p style={{ fontSize: "24px", fontWeight: "600", color: "#111", marginBottom: "20px" }}>${Number(product.price).toFixed(2)}</p>
          <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.6", marginBottom: "30px" }}>{product.description || "No description provided for this item."}</p>
          
          <button style={{ backgroundColor: "#000", color: "#fff", padding: "15px", borderRadius: "6px", border: "none", textTransform: "uppercase", fontWeight: "bold", letterSpacing: "1px", cursor: "pointer", width: "100%", maxWidth: "300px" }}>
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}