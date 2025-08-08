const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  const { productId, rating, comment } = req.body;
  try {
    const review = new Review({
      user: req.user.id,
      product: productId,
      rating,
      comment,
    });
    await review.save();
    const product = await Product.findById(productId);
    product.reviews.push(review._id);
    const reviews = await Review.find({ product: productId });
    product.rating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await product.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;