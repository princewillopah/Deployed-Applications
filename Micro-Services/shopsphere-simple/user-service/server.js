// user-service/server.js
const express = require('express');
const app = express();
const PORT = 5001;

app.get('/api/users', (req, res) => {
  res.json({ message: "Hello from User Service!" });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`User Service running on port ${PORT}`);
});