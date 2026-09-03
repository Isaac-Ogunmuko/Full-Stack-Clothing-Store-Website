const express = require('express');
const router = express.Router();
const Product = require('../Modals/product'); // Pointing to your clothing product model

router.get('/', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find({});
        
        // Send the array of products to the frontend
        res.json(products);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

module.exports = router;