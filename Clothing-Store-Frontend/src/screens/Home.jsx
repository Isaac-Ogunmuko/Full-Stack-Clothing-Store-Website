import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await response.json();
        if (response.ok) {
          // Sort products chronologically by newest first and grab the top 4
          const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setNewArrivals(sorted.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to load new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* 1. Logo Banner */}
      <img 
        src="/elux-fashion-banner.avif" 
        alt="Eluxfashion Banner" 
        style={{ width: "100%", maxWidth: "1000px", height: "360px", objectFit: "contain", marginBottom: "40px" }}
      />

      {/* 2. Featured Categories Section */}
      <div style={{ width: "100%", maxWidth: "900px", padding: "0 20px", marginBottom: "50px" }}>
        <h2 style={{ textAlign: "center", fontSize: "24px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "30px", color: "#111" }}>
          Shop Categories
        </h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          
          {/* On Sale Category Card */}
          <Link 
            to="/items/On-sale" 
            style={{ 
              backgroundColor: '#C5B499', 
              height: "180px", 
              borderRadius: "8px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              textDecoration: "none",
              boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
              transition: "transform 0.2s"
            }}
          >
            <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px" }}>
              On Sale
            </span>
          </Link>

          {/* Swiss Lace Category Card */}
          <Link 
            to="/items/Swiss-Lace" 
            style={{ 
              backgroundColor: '#111111', 
              height: "180px", 
              borderRadius: "8px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              textDecoration: "none",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
            }}
          >
            <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px" }}>
              Swiss Lace
            </span>
          </Link>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 20px", marginBottom: "50px" }}>
        <h3 style={{ textAlign: "center", fontSize: "24px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "25px", color: "#111" }}>
          New Arrivals
        </h3>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {loading ? (
            <p style={{ color: "#666" }}>Loading new arrivals...</p>
          ) : newArrivals.length === 0 ? (
            <p style={{ color: "#666" }}>No new arrivals found. Add some products from your admin dashboard!</p>
          ) : (
            newArrivals.map((product) => (
              <div key={product._id} style={{ border: '1px solid #eaeaea', borderRadius: '6px', padding: '15px', width: '200px', background: '#fff', textAlign: 'left', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <img 
                  src={product.image || 'https://via.placeholder.com/180'} 
                  alt={product.name} 
                  style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }} 
                />
                <h4 style={{ margin: '5px 0', fontSize: '15px', color: '#111' }}>{product.name}</h4>
                <p style={{ color: '#444', fontWeight: 'bold', margin: '0' }}>${product.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* 3. Brand Intro Section */}
      <div style={{ width: "100%", maxWidth: "700px", margin: "0 auto", padding: "0 20px", textAlign: "center", marginBottom: "60px" }}>
        <h3 style={{ textAlign: "center", fontSize: "18px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px", color: "#222" }}>
          Authentic African Fabrics & Fashion
        </h3>

        <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "25px", fontSize: "15px" }}>
          Welcome to Elux Fashion, your premier destination for high-quality African fabrics, stunning clothing pieces, and unique accessories designed to make a statement.
        </p>
        <Link 
          to="/items" 
          style={{ 
            display: "inline-block", 
            backgroundColor: "#000", 
            color: "#fff", 
            padding: "12px 30px", 
            borderRadius: "4px", 
            textDecoration: "none", 
            textTransform: "uppercase", 
            fontSize: "13px", 
            letterSpacing: "1px",
            fontWeight: "500"
          }}
        >
          View All Items
        </Link>
      </div>
      
      {/* Customer Reviews Section Header */}
      <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 20px", marginBottom: "40px" }}>
        <h3 style={{ textAlign: "center", fontSize: "24px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px", color: "#111" }}>
          Customer Reviews
        </h3>
      </div>
    </div>
  );
}