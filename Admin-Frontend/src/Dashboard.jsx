import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [newProduct, setNewProduct] = useState({ 
    name: '', price: '', discountPrice: '', stock: '', category: '', description: '' 
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  // Added description to editForm state
  const [editForm, setEditForm] = useState({ name: '', price: '', discountPrice: '', stock: '', category: '', description: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) };
      const [prodRes, msgRes] = await Promise.all([
        fetch(`${API_URL}/api/products`, { headers }),
        fetch(`${API_URL}/api/messages`, { headers }).catch(() => ({ ok: false }))
      ]);

      if (prodRes.status === 401) {
        window.location.href = '/login';
        return;
      }

      const prodData = prodRes.ok ? await prodRes.json() : [];
      const msgData = msgRes.ok ? await msgRes.json() : [];

      setProducts(Array.isArray(prodData) ? prodData : prodData.products || []);
      setMessages(Array.isArray(msgData) ? msgData : msgData.messages || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newProduct).forEach(key => formData.append(key, newProduct[key]));
    
    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append('images', mediaFiles[i]);
    }

    try {
      const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        setNewProduct({ name: '', price: '', discountPrice: '', stock: '', category: '', description: '' });
        setMediaFiles([]);
        fetchData();
      } else {
        console.error('Server error adding product:', data);
        alert(`Failed to add product: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Network error adding product:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { ...(token ? { 'Authorization': `Bearer ${token}` } : {}) }
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const startEditing = (product) => {
    setEditingId(product._id);
    setEditForm({ 
      name: product.name || '', 
      price: product.price || '', 
      discountPrice: product.discountPrice || '', 
      stock: product.stock || '', 
      category: product.category || '',
      description: product.description || ''
    });
  };

const handleSaveEdit = async (id) => {
    try {
      console.log("Saving edit for ID:", id, "with data:", editForm);
      
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'PUT', // or 'PATCH' if your backend uses patch
        headers: { 
          'Content-Type': 'application/json'
          // Temporarily bypassing token check to see if auth middleware is blocking it:
          // ...(token ? { 'Authorization': `Bearer ${token}` } : {}) 
        },
        body: JSON.stringify(editForm)
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (res.ok) {
        setEditingId(null);
        fetchData();
      } else {
        alert(`Update failed: ${data.message || JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Network or server error while updating product.');
    }
  };

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '20vh', fontSize: '1.2rem' }}>Loading Dashboard...</div>;

  return (
    <div style={{ backgroundColor: '#0c7e74', minHeight: '100vh', padding: '30px', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>Elux Fashion Admin</h1>
          <p style={{ margin: '5px 0 0', color: '#e0f2f1' }}>Manage your clothing inventory and customer inquiries.</p>
        </div>
        <button 
          onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}
          style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
          <p style={{ margin: 0, color: '#e0f2f1', fontSize: '0.9rem' }}>Total Products</p>
          <p style={{ margin: '5px 0 0', fontSize: '2rem', fontWeight: 'bold' }}>{products.length}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
          <p style={{ margin: 0, color: '#e0f2f1', fontSize: '0.9rem' }}>Low Stock Alerts (&lt; 5)</p>
          <p style={{ margin: '5px 0 0', fontSize: '2rem', fontWeight: 'bold', color: products.filter(p => p.stock < 5).length > 0 ? '#ffeb3b' : '#fff' }}>
            {products.filter(p => p.stock < 5).length}
          </p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
          <p style={{ margin: 0, color: '#e0f2f1', fontSize: '0.9rem' }}>Customer Messages</p>
          <p style={{ margin: '5px 0 0', fontSize: '2rem', fontWeight: 'bold' }}>{messages.length}</p>
        </div>
      </div>

      {/* Add Product Form */}
      <div style={{ background: '#fff', color: '#333', padding: '25px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, color: '#0c7e74' }}>➕ Add New Product</h2>
        <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
          <input type="text" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={inputStyle} required />
          <input type="number" placeholder="Regular Price ($)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={inputStyle} required />
          <input type="number" placeholder="Discount Price ($)" value={newProduct.discountPrice} onChange={e => setNewProduct({...newProduct, discountPrice: e.target.value})} style={inputStyle} />
          <input type="number" placeholder="Stock Quantity" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} style={inputStyle} required />
          <input type="text" placeholder="Category (e.g. Hoodies)" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} style={inputStyle} required />
          <input type="file" multiple accept="image/*,video/*" onChange={e => setMediaFiles(e.target.files)} style={{...inputStyle, padding: '6px'}} />
          <textarea placeholder="Product Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} style={{...inputStyle, gridColumn: '1 / -1'}} rows="2" />
          <button type="submit" style={{ gridColumn: '1 / -1', background: '#0c7e74', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
            Publish Product
          </button>
        </form>
      </div>

      {/* Inventory Table */}
      <div style={{ background: '#fff', color: '#333', padding: '25px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, color: '#0c7e74' }}>📦 Inventory Management</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                <th style={thStyle}>Preview</th>
                <th style={thStyle}>Name & Description</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Discount</th>
                <th style={thStyle}>Stock</th>
                <th style={{...thStyle, textAlign: 'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                const imgSource = product.media && product.media.length > 0 
                  ? product.media[0] 
                  : product.images && product.images.length > 0 
                    ? product.images[0] 
                    : null;

                return (
                  <tr key={product._id} style={{ borderBottom: '1px solid #eee', background: product.stock < 5 ? '#ffebee' : 'transparent' }}>
                    {editingId === product._id ? (
                      <>
                        <td style={tdStyle}>-</td>
                        <td style={tdStyle}>
                          <input type="text" placeholder="Name" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} style={{...tableInputStyle, marginBottom: '4px'}} />
                          <input type="text" placeholder="Description" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} style={tableInputStyle} />
                        </td>
                        <td style={tdStyle}><input type="text" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} style={tableInputStyle} /></td>
                        <td style={tdStyle}><input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} style={tableInputStyle} /></td>
                        <td style={tdStyle}><input type="number" value={editForm.discountPrice} onChange={e => setEditForm({...editForm, discountPrice: e.target.value})} style={tableInputStyle} /></td>
                        <td style={tdStyle}><input type="number" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: e.target.value})} style={tableInputStyle} /></td>
                        <td style={{...tdStyle, textAlign: 'right', whiteSpace: 'nowrap'}}>
                          <button onClick={() => handleSaveEdit(product._id)} style={saveBtnStyle}>Save</button>
                          <button onClick={() => setEditingId(null)} style={cancelBtnStyle}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={tdStyle}>
                          {imgSource ? (
                            <img src={imgSource.startsWith('http') ? imgSource : `${API_URL}/${imgSource}`} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                          ) : (
                            <span style={{ color: '#aaa', fontSize: '0.8rem' }}>No Image</span>
                          )}
                        </td>
                        <td style={tdStyle}>
                          <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#666', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description || 'No description'}</div>
                        </td>
                        <td style={tdStyle}>{product.category || 'N/A'}</td>
                        <td style={tdStyle}>${product.price}</td>
                        <td style={{...tdStyle, color: '#2e7d32', fontWeight: 'bold'}}>{product.discountPrice ? `$${product.discountPrice}` : '-'}</td>
                        <td style={tdStyle}>{product.stock} {product.stock < 5 && <span style={{color: '#c62828', fontSize: '0.8rem'}}>(Low)</span>}</td>
                        <td style={{...tdStyle, textAlign: 'right', whiteSpace: 'nowrap'}}>
                          <button onClick={() => startEditing(product)} style={editBtnStyle}>Edit</button>
                          <button onClick={() => handleDelete(product._id)} style={deleteBtnStyle}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Messages */}
      <div style={{ background: '#fff', color: '#333', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, color: '#0c7e74' }}>💬 Customer Inquiries</h2>
        {messages.length === 0 ? <p style={{ color: '#666' }}>No customer messages received yet.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {messages.map(msg => (
              <li key={msg._id} style={{ padding: '12px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <div><strong>{msg.senderEmail}</strong>: {msg.content}</div>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' };
const tableInputStyle = { padding: '5px', width: '100%', boxSizing: 'border-box' };
const thStyle = { padding: '12px', fontSize: '0.9rem' };
const tdStyle = { padding: '12px', fontSize: '0.95rem' };
const editBtnStyle = { background: '#ffa000', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' };
const deleteBtnStyle = { background: '#d32f2f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' };
const saveBtnStyle = { background: '#2e7d32', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' };
const cancelBtnStyle = { background: '#757575', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' };

export default Dashboard;