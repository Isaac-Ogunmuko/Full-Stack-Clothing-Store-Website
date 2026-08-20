import React from 'react';

export default function ItemListing() {
  return (
    <div className="w-full min-h-screen bg-[#7a6519] text-white pt-36 px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-4xl font-serif text-amber-200 font-bold mb-4">Shop Catalog</h1>
        
        {/* Search & Categories Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black/40 p-4 rounded-lg">
          <input 
            type="text" 
            placeholder="Search all items..." 
            className="w-full md:w-1/3 px-4 py-2 rounded bg-black/60 border border-amber-600/50 text-white focus:outline-none"
          />
        </div>

        {/* Product Grid Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
          {/* Product cards will map here */}
        </div>
      </div>
    </div>
  );
}