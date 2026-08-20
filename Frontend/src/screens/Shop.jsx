import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Later, you will replace this with your actual Node/MongoDB backend URL
  useEffect(() => {
    // Example of fetching products dynamically:
    // fetch('http://localhost:5000/api/products')
    //   .then(res => res.json())
    //   .then(data => { setProducts(data); setLoading(false); })
    //   .catch(err => console.error(err));

    // Temporary placeholder data so you can see the layout right away
    setProducts([
      { id: 1, title: "Swiss Lace, African Engagement Fabric", price: "HKD 2,438.73", category: "Swiss Lace", image: "/eluxe-logo.png" },
      { id: 2, title: "Wedding Fabric, High Quality Swiss Lace", price: "HKD 1,602.60", category: "Swiss Lace", image: "/eluxe-logo.png" },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#121212] text-white pt-28 px-6 md:px-12 pb-16">
      
      {/* Top Header / Search bar area */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-serif text-amber-200">Shop Catalog</h1>
        
        {/* Search Input */}
        <div className="w-full md:w-72 mt-4 md:mt-0">
          <input 
            type="text" 
            placeholder="Search all items..." 
            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Sidebar: Categories (Like Etsy) */}
        <div className="md:col-span-1 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-amber-300">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><button className="hover:text-amber-300 transition-colors">All Items (229)</button></li>
            <li><button className="hover:text-amber-300 transition-colors">On Sale (229)</button></li>
            <li><button className="hover:text-amber-300 transition-colors">Swiss Lace (229)</button></li>
          </ul>
        </div>

        {/* Right Content: Product Grid */}
        <div className="md:col-span-3">
          {loading ? (
            <p className="text-gray-400">Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-black/50 border border-white/10 rounded-xl overflow-hidden group hover:border-amber-400/50 transition-all">
                  <div className="w-full h-64 bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-medium text-white truncate">{product.title}</h4>
                    <p className="text-amber-300 font-bold text-sm">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}