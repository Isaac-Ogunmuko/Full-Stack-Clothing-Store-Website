const express = require('express');
const router = express.Router();

const createOrder = require('./createOrder');

router.post('/create', createOrder);

module.exports = router;
