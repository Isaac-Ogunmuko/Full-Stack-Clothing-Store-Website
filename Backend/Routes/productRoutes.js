const express = require('express');
const router = express.Router();

// Import individual route controllers/handlers
const getProducts = require('./getProducts');
const getProductById = require('./getProductById');
const addProduct = require('./addProduct');

// Define active routes
router.get('/', getProducts);           
router.get('/getproducts', getProducts); 
router.get('/getproduct/:id', getProductById);
router.post('/addproduct', addProduct);

module.exports = router;