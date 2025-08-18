// product-service/server.js
const express = require('express');
const app = express();
const PORT = 5002;

app.get('/api/products', (req, res) => {
  res.json({ message: "Hello from Product Service!" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Product Service running on port ${PORT}`);
});