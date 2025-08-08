const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// GET /api/products?search=&category=
exports.getProducts = asyncHandler(async (req, res) => {
  const { search, category } = req.query;
  const query = {};
  if (search) {
    const regex = new RegExp(search, 'i');
    query.$or = [{ name: regex }, { description: regex }];
  }
  if (category) query.category = category;
  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
});

// GET /api/products/:id
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404); throw new Error('Product not found');
  }
  res.json(product);
});

// POST /api/products (admin)
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, countInStock, category, images } = req.body;
  const product = await Product.create({ name, description, price, countInStock, category, images });
  res.status(201).json(product);
});

// PUT /api/products/:id (admin)
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  const fields = ['name','description','price','countInStock','category','images'];
  fields.forEach(f => { if (req.body[f] !== undefined) product[f] = req.body[f]; });
  await product.save();
  res.json(product);
});

// DELETE /api/products/:id (admin)
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  await product.remove();
  res.json({ message: 'Product removed' });
});

// POST /api/products/:id/reviews (protected)
exports.createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  const already = product.reviews.find(r => r.user.toString() === req.user._id.toString());
  if (already) { res.status(400); throw new Error('Product already reviewed'); }
  const review = { user: req.user._id, name: req.user.name, rating: Number(rating), comment };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.numReviews;
  await product.save();
  res.status(201).json({ message: 'Review added' });
});
