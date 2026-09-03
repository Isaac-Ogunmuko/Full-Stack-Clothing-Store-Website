const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  description: { type: String },
  stock: { 
    type: Number, 
    required: true, 
    default: 5, 
    min: [0, 'Stock cannot be negative'] // 🛡️ Safely blocks any negative numbers at the database level!
  }, 
  images: [{ type: String }],
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);