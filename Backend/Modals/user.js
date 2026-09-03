const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Prevents duplicate admin accounts with the same email
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true // This will store the secure, encrypted bcrypt hash string
    },
    role: {
        type: String,
        enum: ['admin'], // Since only admins log into this app, we lock it to 'admin'
        default: 'admin' 
    }
}, { 
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt' tracking fields
});

module.exports = mongoose.model('User', UserSchema);
