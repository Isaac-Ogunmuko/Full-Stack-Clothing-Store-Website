import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';


export default function Navbar() {
  return (
<nav style={{ background: '#000000', display: 'flex',flexDirection:'column', width:150}}className="navbar fixed top-0 left-0 h-screen w-64 flex flex-col items-start px-8 py-6 text-white z-50"
>
      
      {/* Top Left: Logo */}
      <Link to="/" className="flex items-center nav-logo">
        <img style = {{height: 150, width: 'auto', objectfit: 'contain'}}
          src="/eluxe-logo.png" 
          alt="ELUX FASHION EMBLEM" 
        />
      </Link>

      {/* Center: Navigation Links */}
<nav style={{ display: 'flex',flexDirection: 'column',justifycontent:'space-between', alignItems: 'center', gap:'32px'}}>
        <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', transition: 'color 0.3s ease' }}>Home</Link>
        <Link to="/items" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', transition: 'color 0.3s ease' }}>Items</Link>
        <Link to="/reviews" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', transition: 'color 0.3s ease' }}>Reviews</Link>
        <Link to="/about" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', transition: 'color 0.3s ease' }}>About</Link>
        <Link to="/policies" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', transition: 'color 0.3s ease' }}>Shop Policies</Link>
        <Link to="/contact" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', transition: 'color 0.3s ease' }}>Contact</Link>
</nav>


    {/* Bottom Left: Cart Icon */}
<div className="flex items-center mt-auto mb-6 w-full justify-center">
  <Link to="/cart" className="relative text-white hover:text-amber-300 transition-colors">
    <ShoppingCart size={50} />
    <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
      0
    </span>
  </Link>
</div>


    </nav>
  );
}