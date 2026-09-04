const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../Modals/product');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Server error" });
    }
});


router.post('/', upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'video', maxCount: 1 }
]), async (req, res) => {
    try {
        const { title, category, price, originalPrice, discountText, stock, description } = req.body;

        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        const imageUrls = (req.files && req.files['images']) ? req.files['images'].map(file => baseUrl + file.filename) : [];
        const videoUrl = (req.files && req.files['video']) ? baseUrl + req.files['video'][0].filename : '';

        const newProduct = new Product({
            title,
            category,
            price,
            originalPrice,
            discountText,
            stock,
            description,
            images: imageUrls,
            videoUrl
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

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