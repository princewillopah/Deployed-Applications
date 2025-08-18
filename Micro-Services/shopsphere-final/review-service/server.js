// review-service/server.js
const express = require('express');
const app = express();
const PORT = 5004;

app.get('/api/reviews', (req, res) => {
  res.json({ message: "Hello from Review Service (Redis)" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Review Service running on port ${PORT}`);
});