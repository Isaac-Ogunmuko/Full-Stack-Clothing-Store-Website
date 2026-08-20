import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#7a6519] text-white flex flex-col justify-center items-center px-6">
      
      {/* Center Content */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-serif italic tracking-wide text-white drop-shadow-lg">
          Elux fashion
        </h1>
        
        <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-amber-200">
          African Fabrics, Clothing and Accessories
        </p>

        {/* Call to action button */}
        <div className="pt-6">
          <Link 
            to="/shop" 
            className="inline-block border border-white/40 px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>

    </div>
  );
}