const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    inStock: {
        type: Boolean,
        default: true
    },
    isOnSale: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);