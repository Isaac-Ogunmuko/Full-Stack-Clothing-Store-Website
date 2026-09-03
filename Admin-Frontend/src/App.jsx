import React, { useState } from 'react';
import Dashboard from './Dashboard'; // Import the dashboard view sitting in your folder!

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the admin is logged in

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);

    try {
      // 🔗 FIXED THE TARGET URL PATH WAY to match: http://localhost:8000/api/auth/login
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 🔒 Save the secure JWT token into browser memory so Dashboard.jsx can use it
        localStorage.setItem('adminToken', data.token);
        alert('Login successful!');
        setIsLoggedIn(true); // Switch view to your inventory dashboard!
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Could not connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  // 🔄 VIEW SWITCHER: If logged in, hide the login box and show your Dashboard interface!
  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#000' }}>
      <h2>Admin Dashboard Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email Address:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
