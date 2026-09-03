import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Network error. Make sure the backend server is running.");
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", color: "#222222", minHeight: "100vh", padding: "140px 30px 60px 30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      <div style={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "25px" }}>
        
        {/* HEADER */}
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#121212" }}>Contact Us</h1>
          <p style={{ fontSize: "14px", color: "#555", marginTop: "6px" }}>
            Have questions about our African fabrics, clothing, or accessories? Reach out to us! We'd love to hear from you.
          </p>
        </div>

        {submitted ? (
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "20px", borderRadius: "8px", color: "#166534" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "4px" }}>Thank you for reaching out!</h2>
            <p style={{ fontSize: "14px" }}>Your message has been sent successfully. We will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="Enter your name"
                  style={{ padding: "12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", backgroundColor: "#fff" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>Your Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={{ padding: "12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", backgroundColor: "#fff" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>Subject</label>
              <input 
                type="text" 
                name="subject" 
                required 
                value={formData.subject} 
                onChange={handleChange}
                placeholder="What is this regarding?"
                style={{ padding: "12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", backgroundColor: "#fff" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>Message</label>
              <textarea 
                name="message" 
                rows="5" 
                required 
                value={formData.message} 
                onChange={handleChange}
                placeholder="Type your message here..."
                style={{ padding: "12px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", outline: "none", backgroundColor: "#fff", resize: "vertical" }}
              />
            </div>

            <button 
              type="submit" 
              style={{ backgroundColor: "#121212", color: "#ffffff", padding: "14px", borderRadius: "30px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer", textTransform: "uppercase", marginTop: "10px" }}
            >
              Send Message
            </button>
          </form>
        )}

      </div>
    </div>
  );
}