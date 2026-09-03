const express = require('express');
const router = express.Router();
const Order = require('../Modals/order');
const Product = require('../Modals/product');

router.post('/create', async (req, res) => {
  try {
    const { email, shippingAddress, products, totalAmount } = req.body;

    // 1. Validate incoming data
    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, error: "No products in order." });
    }

    // 2. Create and save the new order in MongoDB
    const newOrder = new Order({
      email,
      shippingAddress,
      products,
      totalAmount
    });
    await newOrder.save();

    // 3. Decrement the stock for each purchased item
    // 3. Decrement the stock safely and trigger Mongoose validation
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
        await product.save(); // This explicitly triggers your Mongoose min: 0 validation!
      }
    }

    res.status(201).json({ 
      success: true, 
      message: "Order placed successfully and inventory updated!" 
    });

  } catch (err) {
    console.error("Error processing order:", err);
    res.status(500).json({ success: false, error: "Server error while processing order." });
  }
});

module.exports = router;