// user-service/server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }
}));

// Routes
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json({ message: "Hello from User Service (MongoDB)", users });
});

app.post('/api/users', express.json(), async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  await user.save();
  res.status(201).json(user);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`User Service running on port ${PORT}`);
});