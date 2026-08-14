const express = require('express');
const router = express.Router();

const addProduct = require('./addProduct');
const getProducts = require('./getProducts');
const getProductById = require('./getProductById');

router.post('/add', addProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;