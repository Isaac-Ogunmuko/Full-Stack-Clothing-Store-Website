import React, { useState } from 'react';
import Dashboard from './Dashboard'; // 👈 1. Import your dashboard here

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
      } else {
        setErrorMsg(data.message || data.error || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Server connection failed. Make sure backend is running.');
    }
  };

  // 👈 2. If logged in, instantly render your fully built Dashboard component!
  if (isLoggedIn) {
    return <Dashboard />;
  }

  // Otherwise, render the login form
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '300px' }}>
        <h2 style={{ textAlign: 'center' }}>Admin Portal</h2>
        {errorMsg && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{errorMsg}</p>}
        <input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          required
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: 'black', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}