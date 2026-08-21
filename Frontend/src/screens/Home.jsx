import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{"background": "#24c7c7"}} className="relative w-full min-h-screen text-white flex flex-col justify-start items-center">
      
      {/* 1. Correctly structured image component at the absolute top edge */}
      <img 
        src="/elux-fashion-banner.avif" 
        alt="Eluxfashion Banner" 
        className="w-full max-w-4xl h-auto object-contain mb-8"
      />

      
  

    </div>
  );
}
