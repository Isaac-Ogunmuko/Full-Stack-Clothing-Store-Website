const express = require('express');
const router = express.Router();
const Product = require('../Modals/product'); 
router.post('/', async (req, res) => {
    const productData = req.body; 
    const newProduct = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category, 
        image: productData.image
    };

    console.log(newProduct);

    try {
        await Product.create(newProduct);

        res.status(201).send("Product added successfully");

    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while adding the product.");
    }
});

module.exports = router;