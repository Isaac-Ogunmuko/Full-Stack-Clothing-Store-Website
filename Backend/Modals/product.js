const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    CartArray: {
        type: Array,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);