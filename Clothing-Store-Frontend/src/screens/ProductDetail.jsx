import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/products`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(data => {
        const found = data.find(p => p._id === id || String(p.id) === String(id));
        
        if (found) {
          setProduct(found);
          let formattedImages = [];
          if (found.images && found.images.length > 0) {
            formattedImages = found.images.map(img => typeof img === 'string' ? { type: "image", src: img } : img);
          } else if (found.image) {
            formattedImages = [{ type: "image", src: found.image }];
          } else {
            formattedImages = [{ type: "image", src: "/SwissLace(1).jfif" }];
          }

          // Ensure the demo video is always available as the 4th thumbnail
          const hasVideo = formattedImages.some(img => img.type === "video");
          if (!hasVideo) {
            formattedImages.push({ type: "video", src: "/SwissLace.mp4" });
          }

          setSelectedImage(formattedImages[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  // Handle adding product to cart and navigating to cart screen
  const handleAddToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Resolve primary image source
    let primaryImage = "/SwissLace(1).jfif";
    if (product.images && product.images.length > 0) {
      primaryImage = typeof product.images[0] === 'string' ? product.images[0] : product.images[0].src;
    } else if (product.image) {
      primaryImage = product.image;
    }

    const productToAdd = {
      id: product._id || product.id,
      name: product.name || product.title || "Fabric Item",
      price: Number(product.price || 0),
      image: primaryImage,
      quantity: 1
    };
    
    // Check if item already exists in cart, increment quantity if so, otherwise add new
    const itemIndex = existingCart.findIndex(item => String(item.id) === String(productToAdd.id));
    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push(productToAdd);
    }

    // Save updated cart back to localStorage and navigate to /cart
    localStorage.setItem('cartItems', JSON.stringify(existingCart));
    navigate('/cart');
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: "#ffffff", color: "#222222", minHeight: "100vh", padding: "180px 30px", textAlign: "center", fontSize: "18px", fontWeight: "600" }}>
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ backgroundColor: "#ffffff", color: "#222222", minHeight: "100vh", padding: "180px 30px", textAlign: "center", fontSize: "18px", fontWeight: "600" }}>
        Product not found.
      </div>
    );
  }

  // Parse images and guarantee video inclusion
  let productImages = product.images && product.images.length > 0 
    ? product.images.map(img => typeof img === 'string' ? { type: "image", src: img } : img)
    : [{ type: "image", src: product.image || "/SwissLace(1).jfif" }];

  const hasVideo = productImages.some(img => img.type === "video");
  if (!hasVideo) {
    productImages.push({ type: "video", src: "/SwissLace.mp4" });
  }

  const productName = product.name || product.title || "Fabric Item";
  const productPrice = Number(product.price || 0);
  const originalPrice = product.originalPrice ? Number(product.originalPrice) : productPrice * 1.2;

  // Dynamic stock message and color logic based on database quantity
  const stockCount = product.stock !== undefined ? product.stock : 2;
  let stockStatus = "";
  let stockColor = "#d97706";

  if (stockCount === 0) {
    stockStatus = "Out of stock";
    stockColor = "#dc2626"; // red
  } else if (stockCount <= 3) {
    stockStatus = `Low in stock, only ${stockCount} left`;
    stockColor = "#d97706"; // orange
  } else {
    stockStatus = "In stock";
    stockColor = "#16a34a"; // green
  }

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#222222", minHeight: "100vh", padding: "140px 30px 60px 30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* MAIN TOP SECTION */}
      <div style={{ width: "100%", maxWidth: "1400px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "start" }}>
        
        {/* LEFT COLUMN: Image & Video Gallery */}
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {productImages.map((img, index) => (
              <div 
                key={index}
                onClick={() => setSelectedImage(img)}
                style={{ 
                  width: "70px", height: "85px", 
                  border: selectedImage?.src === img.src ? "2px solid #121212" : "1px solid #ddd", 
                  borderRadius: "6px", overflow: "hidden", cursor: "pointer", backgroundColor: "#f9f9f9",
                  position: "relative", display: "flex", alignItems: "center", justifyContent: "center"
                }}
              >
                {img.type === "video" ? (
                  <div style={{ position: "relative", width: "100%", height: "100%", backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <video src={img.src} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} muted />
                    <span style={{ position: "absolute", color: "#fff", fontSize: "16px", fontWeight: "bold" }}>▶</span>
                  </div>
                ) : (
                  <img src={img.src} alt="thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )}
              </div>
            ))}
          </div>
          
          {/* MAIN DISPLAY CONTAINER */}
          <div style={{ flex: 1, height: "550px", backgroundColor: "#f9f9f9", borderRadius: "8px", overflow: "hidden", border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {selectedImage?.type === "video" ? (
              <video src={selectedImage.src} controls autoPlay muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <img src={selectedImage?.src || productImages[0].src} alt={productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Full Product Details & Shipping Policies */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Title moved to the very top */}
          <h1 style={{ fontSize: "22px", fontWeight: "600", color: "#121212", lineHeight: "1.4", margin: 0 }}>{productName}</h1>

          <div style={{ fontSize: "13px", fontWeight: "bold", color: stockColor }}>{stockStatus}</div>
          
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <span style={{ fontSize: "28px", fontWeight: "bold", color: "#121212" }}>${productPrice.toFixed(2)}</span>
              <span style={{ fontSize: "16px", color: "#777", textDecoration: "line-through" }}>${originalPrice.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: "12px", color: "#16a34a", marginTop: "4px", fontWeight: "500" }}>{product.discountText || "15% off • Sale ends on September 11"}</p>
            <p style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>Local taxes included (where applicable)</p>
          </div>
          
          <div style={{ fontSize: "14px", color: "#555" }}>
            <span style={{ fontWeight: "600", color: "#121212", marginRight: "8px" }}>Eluxfashion</span>
            <span style={{ color: "#d97706" }}>★★★★★</span> ({product.reviewCount || 61})
          </div>

          <div style={{ fontSize: "13px", color: "#121212", display: "flex", alignItems: "center", gap: "6px", fontWeight: "500" }}>
            <span>✓</span> Returns & exchanges accepted
          </div>

          <button 
            onClick={handleAddToCart}
            style={{ backgroundColor: "#222", color: "#ffffff", padding: "16px", borderRadius: "30px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer", marginTop: "5px", textTransform: "uppercase" }}
          >
            Add to cart
          </button>

          {/* ITEM DETAILS ACCORDION BLOCK */}
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "15px", marginTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
              <span>Item details</span>
              <span>˄</span>
            </div>
            <div style={{ fontSize: "13px", color: "#4b5563", marginTop: "10px", lineHeight: "1.6" }}>
              <p><strong>Highlights:</strong></p>
              <ul style={{ paddingLeft: "18px", margin: "5px 0" }}>
                <li>Made by Eluxfashion</li>
                <li>Supplies for making crafts</li>
              </ul>
              <p style={{ marginTop: "8px" }}>{product.description || "High Quality Sequin Lace, African Wedding Fabric."}</p>
            </div>
          </div>

          {/* SHIPPING AND RETURN POLICIES BLOCK */}
          <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
              <span>Shipping and return policies</span>
              <span>˄</span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#374151", marginTop: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>📦</span> <span>Ships out within <strong>1-2 business days</strong></span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>🔄</span> <span>Returns & exchanges accepted within <strong>30 days</strong></span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>📍</span> <span>Ships from: <strong>United States</strong></span>
              </div>
              <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                Contact the shop to find out about available shipping options.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}