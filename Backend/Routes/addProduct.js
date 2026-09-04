const express = require('express');
const router = express.Router();
const Product = require('../Modals/product'); 
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// 1. Configure Multer storage for local file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// 🔒 Security Gatekeeper (Middleware)
const protectAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Access denied. No valid token found." });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: "Access forbidden. Administrative privileges required." });
        }
        
        req.admin = decoded; 
        next(); 
    } catch (err) {
        return res.status(401).json({ error: "Authorization failed. Token is invalid or expired." });
    }
};

// 📦 GET All Products Endpoint
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Server error while fetching products." });
    }
});

// 👕 Add Product Endpoint with Diagnostic Logging
router.post('/', protectAdmin, upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'video', maxCount: 1 }
]), async (req, res) => {
    console.log("🔥 HIT /api/products POST route!");
    
    try {
        const { name, category, price, originalPrice, discountPrice, stock, description } = req.body;

        // Save relative paths so the frontend dynamically attaches the correct host (localhost or Render)
        const imagesField = req.files && req.files['images'] ? req.files['images'] : [];
        const videoField = req.files && req.files['video'] ? req.files['video'] : [];

        const imageUrls = imagesField.map(file => `/uploads/${file.filename}`);
        const videoUrl = videoField.length > 0 ? `/uploads/${videoField[0].filename}` : '';

        const newProduct = new Product({
            name,
            category,
            price,
            originalPrice,
            discountPrice: discountPrice !== '' ? discountPrice : null, // Fix discount price persistence
            stock,
            description,
            image: imageUrls.length > 0 ? imageUrls[0] : '', 
            images: imageUrls,                                     
            videoUrl
        });

        console.log("Saving new product with files:", newProduct);
        await newProduct.save();
        
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "An error occurred while adding the product." });
    }
});

// ✏️ UPDATE Product Endpoint
router.put('/:id', protectAdmin, async (req, res) => {
    console.log(`🔥 HIT /api/products/${req.params.id} PUT route!`);
    try {
        const { name, category, price, originalPrice, discountPrice, stock, description } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { 
                name,
                category,
                price,
                originalPrice,
                discountPrice: discountPrice !== '' ? discountPrice : null,
                stock,
                description
            },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        console.log("Updated product successfully:", updatedProduct);
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "An error occurred while updating the product." });
    }
});

// ❌ DELETE Product Endpoint
router.delete('/:id', protectAdmin, async (req, res) => {
    console.log(`🔥 HIT /api/products/${req.params.id} DELETE route!`);
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found." });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "An error occurred while deleting the product." });
    }
});

module.exports = router;