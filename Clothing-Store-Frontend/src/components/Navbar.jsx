import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  // 1. Hook declared inside the component function
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav style={{ background: '#0a0a0a', display: 'flex', flexDirection: 'row', width: '100%' }} className="navbar fixed top-0 left-0 w-full h-20 flex flex-row items-center justify-between px-8 z-50">
      
      {/* Top Left: Logo */}
      <Link to="/" className="flex items-center nav-logo">
        <img style={{ height: 80, width: 'auto', objectFit: 'contain' }}
          src="/eluxe-logo.png" 
          alt="ELUX FASHION EMBLEM" 
        />
      </Link>

      {/* Center: Navigation Links (Changed inner <nav> to a <div>) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '100px' }}>
        <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', transition: 'color 0.3s ease' }}>Home</Link>
        
        {/* Wrap Items and Dropdown together for correct alignment */}
        <div 
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link to="/items" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', transition: 'color 0.3s ease' }}>
            Items
            <span style={{ fontSize: '12px' }}>▼</span>
          </Link>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              backgroundColor: '#111111',
              padding: '15px',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              minWidth: '160px',
              zIndex: 1000,
              boxShadow: '0px 4px 12px rgba(0,0,0,0.5)'
            }}>
              <Link to="/items/On-sale" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase' }}>On Sale</Link>
              <Link to="/items/Swiss-Lace" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px', textTransform: 'uppercase' }}>Swiss Lace</Link>
            </div>
          )}
        </div>

        <Link to="/reviews" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', transition: 'color 0.3s ease' }}>Reviews</Link>
        <Link to="/contact" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '20px', textTransform: 'uppercase', letterSpacing: '2px', transition: 'color 0.3s ease' }}>Contact</Link>
      </div>

      {/* Right: Cart Icon */}
      <div className="flex items-center justify-center h-full">
        <Link to="/cart" className="relative flex items-center text-white hover:text-amber-300 transition-colors">
          <ShoppingCart size={25} />
          <span className="absolute -top-1 -right-2 bg-amber-400 text-black text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
            0
          </span>
        </Link>
      </div>

    </nav>
  );
}
