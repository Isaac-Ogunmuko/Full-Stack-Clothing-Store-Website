const express = require('express');
const router = express.Router();
const Order = require('../Modals/order'); // Your future order model
const { body, validationResult } = require('express-validator');

router.post("/createorder", [
  body('email', 'Invalid email format').isEmail(),
  body('shippingAddress', 'Shipping address is required').notEmpty(),
  body('items', 'Cart cannot be empty').isArray({ min: 1 })
], async (req, res) => {
  console.log(req.body);
  
  // Validate request fields
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {
    // Create the order document in MongoDB for the guest
    const newOrder = await Order.create({
      email: req.body.email,
      shippingAddress: req.body.shippingAddress,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status: "Pending" // Initial order status
    });

    res.json({ success: true, order: newOrder });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

module.exports = router;