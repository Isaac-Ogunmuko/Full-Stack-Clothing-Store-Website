const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../Modals/product');

// 1. Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// 2. GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 3. POST new product with file uploads (Images + Video)
router.post('/', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'video', maxCount: 1 }
]), async (req, res) => {
    try {
        const { title, category, price, originalPrice, discountText, stockStatus, description } = req.body;

        const baseUrl = 'http://localhost:8000/uploads/';
        const imageUrls = req.files['images'] ? req.files['images'].map(file => baseUrl + file.filename) : [];
        const videoUrl = req.files['video'] ? baseUrl + req.files['video'][0].filename : '';

        const newProduct = new Product({
            title,
            category,
            price,
            originalPrice,
            discountText,
            stockStatus,
            description,
            images: imageUrls,
            videoUrl
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 4. PUT update product (Publicly open for local testing & saving)
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// 5. DELETE product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;