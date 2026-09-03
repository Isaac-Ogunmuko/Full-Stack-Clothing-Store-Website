import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
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

         {/* New Arrivals Section */}
<         div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 20px", marginBottom: "40px" }}>
          <h3 style={{ textAlign: "center", fontSize: "24px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px", color: "#111" }}>
          New Arrivals
                </h3>
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
      
  <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 20px", marginBottom: "40px" }}>
          <h3 style={{ textAlign: "center", fontSize: "24px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px", color: "#111" }}>
          Customer Reviews
                </h3>
          </div>
    </div>
  );
}