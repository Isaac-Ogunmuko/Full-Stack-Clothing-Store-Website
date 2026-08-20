const express = require('express');
const router = express.Router();
const Product = require('../Modals/product'); 

router.post('/', async (req, res) => {
    const productData = req.body; 
    
    const newProduct = {
        title: productData.title || productData.name, // Supports both 'title' or 'name' from frontend
        description: productData.description,
        price: productData.price,
        category: productData.category, 
        image: productData.image,
        inStock: productData.inStock ?? true,
        isOnSale: productData.isOnSale ?? false
    };

    console.log("Saving new product:", newProduct);

    try {
        await Product.create(newProduct);
        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "An error occurred while adding the product." });
    }
});

module.exports = router;