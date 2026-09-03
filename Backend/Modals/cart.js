const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true 
    },
    items: [{ 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        priceAtTimeOfAdding: { type: Number } 
    }],
    totalPrice: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);