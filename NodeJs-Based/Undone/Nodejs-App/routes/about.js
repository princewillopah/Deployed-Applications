const express = require('express');
const router = express.Router();

// About page route
router.get('/', (req, res) => {
  res.render('about', { title: 'About Us', content: 'This is a simple Node.js app built with Express and EJS. Learn more about us here!' });
});

module.exports = router;