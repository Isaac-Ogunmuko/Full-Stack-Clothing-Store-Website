import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full bg-black/40 backdrop-blur-md text-white px-8 py-5 z-50 border-b border-white/10">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Top Left: Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/eluxe-logo.png" 
            alt="ELUX FASHION FABRIC" 
            style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Center: Navigation Tabs (Always Visible) */}
        <nav className="flex items-center gap-6 text-xs font-bold tracking-[0.15em] uppercase">
          <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
          <span className="text-white/30">•</span>
          <Link to="/shop" className="hover:text-amber-300 transition-colors">Items</Link>
          <span className="text-white/30">•</span>
          <Link to="/reviews" className="hover:text-amber-300 transition-colors">Reviews</Link>
          <span className="text-white/30">•</span>
          <Link to="/about" className="hover:text-amber-300 transition-colors">About</Link>
          <span className="text-white/30">•</span>
          <Link to="/policies" className="hover:text-amber-300 transition-colors">Shop Policies</Link>
          <span className="text-white/30">•</span>
          <Link to="/contact" className="hover:text-amber-300 transition-colors">Contact</Link>
        </nav>

        {/* Top Right: Cart Icon */}
        <div className="flex items-center">
          <Link to="/cart" className="relative text-white hover:text-amber-300 transition-colors">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}