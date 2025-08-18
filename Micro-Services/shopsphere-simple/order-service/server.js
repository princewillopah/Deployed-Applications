// order-service/server.js
const express = require('express');
const app = express();
const PORT = 5003;

app.get('/api/orders', (req, res) => {
  res.json({ message: "Hello from Order Service!" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Order Service running on port ${PORT}`);
});