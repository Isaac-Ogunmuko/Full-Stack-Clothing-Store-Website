const express = require('express');
const router = express.Router();

const addProduct = require('./addProduct');
const getProducts = require('./getProducts');
const getProductById = require('./getProductById');

router.post('/add', addProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 319a979a2a2e0b780aac1c22cf3cbeca96682525
