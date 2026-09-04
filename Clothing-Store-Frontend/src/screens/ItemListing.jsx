import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ItemListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://clothing-store-backend-4z5g.onrender.com/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products from backend:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => {
    const productName = product.name || product.title || "";
    const productCategory = product.category || "";
    const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || productCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "low-high") return a.price - b.price;
    if (sortOption === "high-low") return b.price - a.price;
    if (sortOption === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    return 0;
  });

  const itemsPerPage = 8; // Increased to show more per page like an ecommerce store
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const showingStart = sortedProducts.length > 0 ? startIndex + 1 : 0;
  const showingEnd = Math.min(startIndex + itemsPerPage, sortedProducts.length);

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "140px 30px 60px 30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      <div style={{ width: "100%", maxWidth: "1400px" }}>
        
        <h1 style={{ fontSize: "32px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", color: "#111", marginBottom: "30px" }}>
          Shop Catalog
        </h1>
        
        {/* Search, Categories & Sort Bar */}
        <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", border: "1px solid #eaeaea", marginBottom: "20px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "15px" }}>
          
          <input 
            type="text" 
            placeholder="Search all items..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            style={{ width: "100%", maxWidth: "300px", padding: "10px 15px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", outline: "none" }}
          />

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["All", "Lace", "Ankara", "Velvet", "Brocade"].map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                style={{
                  padding: "8px 14px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  backgroundColor: selectedCategory === cat ? "#111" : "#fff",
                  color: selectedCategory === cat ? "#fff" : "#333",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ padding: "10px 15px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", backgroundColor: "#fff", cursor: "pointer", outline: "none" }}
          >
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
          </select>

        </div>

        <div style={{ marginBottom: "25px", fontSize: "14px", color: "#666", fontWeight: "500" }}>
          Showing {showingStart}-{showingEnd} of {sortedProducts.length} products
        </div>

        {/* Product Grid Area - Fixed max-width behavior using auto-fill with fixed card widths */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 320px))", gap: "25px", justifyContent: "start" }}>
          
          {loading ? (
            <p style={{ color: "#666", fontSize: "16px", gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
              Loading products from database...
            </p>
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product) => {
              const productId = product._id || product.id;
              const productName = product.name || product.title;
              const productTag = product.tag || (product.inStock === false ? "Out of Stock" : "");
              const isOutOfStock = productTag === "Out of Stock" || product.inStock === false;
              const primaryImage = product.image || (product.images && product.images.length > 0 ? product.images[0] : null);

              return (
                <div key={productId} style={{ border: "1px solid #eaeaea", borderRadius: "12px", padding: "16px", backgroundColor: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", opacity: isOutOfStock ? 0.7 : 1, transition: "transform 0.2s", cursor: "pointer" }}>
                  
                  <Link to={`/product/${productId}`} style={{ textDecoration: "none" }}>
                    <div style={{ position: "relative", width: "100%", height: "280px", backgroundColor: "#f5f5f5", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontSize: "14px", marginBottom: "15px", overflow: "hidden" }}>
                      
                      {productTag && (
                        <span style={{ 
                          position: "absolute", 
                          top: "10px", 
                          left: "10px", 
                          backgroundColor: productTag === "Sale" ? "#d9534f" : productTag === "Out of Stock" ? "#6c757d" : "#111", 
                          color: "#fff", 
                          padding: "5px 10px", 
                          fontSize: "10px", 
                          fontWeight: "bold", 
                          borderRadius: "4px", 
                          textTransform: "uppercase", 
                          letterSpacing: "1px",
                          zIndex: 2
                        }}>
                          {productTag}
                        </span>
                      )}

                      {primaryImage ? (
                        <img src={primaryImage} alt={productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        "Product Image"
                      )}
                    </div>
                  </Link>

                  <div>
                    <Link to={`/product/${productId}`} style={{ textDecoration: "none" }}>
                      <h3 
                        style={{ fontSize: "16px", fontWeight: "600", color: "#111", marginBottom: "8px", lineHeight: "1.4", height: "44px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
                        onMouseOver={(e) => e.target.style.textDecoration = "underline"}
                        onMouseOut={(e) => e.target.style.textDecoration = "none"}
                      >
                        {productName}
                      </h3>
                    </Link>
                    <p style={{ color: "#111", fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>${Number(product.price).toFixed(2)}</p>
                  </div>

                  <button 
                    disabled={isOutOfStock}
                    style={{ 
                      backgroundColor: isOutOfStock ? "#cccccc" : "#000", 
                      color: "#fff", 
                      padding: "12px", 
                      borderRadius: "6px", 
                      border: "none", 
                      textTransform: "uppercase", 
                      fontSize: "12px", 
                      fontWeight: "bold",
                      letterSpacing: "1px", 
                      cursor: isOutOfStock ? "not-allowed" : "pointer", 
                      width: "100%" 
                    }}
                  >
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              );
            })
          ) : (
            <p style={{ color: "#666", fontSize: "16px", gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
              No items found matching your search or category filter.
            </p>
          )}

        </div>

      </div>

      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "40px", alignItems: "center" }}>
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} style={{ backgroundColor: "#f5f5f5", color: "#333", padding: "0 15px", height: "35px", borderRadius: "20px", border: "none", cursor: "pointer", fontWeight: "bold" }}>PREV</button>
          )}
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} style={{ backgroundColor: currentPage === pageNumber ? "#333" : "#f5f5f5", color: currentPage === pageNumber ? "#fff" : "#333", width: "35px", height: "35px", borderRadius: "50%", border: "none", cursor: "pointer", fontWeight: "bold" }}>{pageNumber}</page>
            );
          })}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} style={{ backgroundColor: "#f5f5f5", color: "#333", padding: "0 15px", height: "35px", borderRadius: "20px", border: "none", cursor: "pointer", fontWeight: "bold" }}>NEXT</button>
        </div>
      )}
    </div>
  );
}