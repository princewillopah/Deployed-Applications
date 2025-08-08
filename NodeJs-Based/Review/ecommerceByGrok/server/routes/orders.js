const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.product');
    if (!user.cart.length) return res.status(400).json({ message: 'Cart is empty' });

    const total = user.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const order = new Order({
      user: req.user.id,
      items: user.cart,
      total,
    });
    await order.save();
    user.cart = [];
    await user.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;