const express = require('express');
const router = express.Router();

const createOrder = require('./createOrder');

router.post('/create', createOrder);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 319a979a2a2e0b780aac1c22cf3cbeca96682525
