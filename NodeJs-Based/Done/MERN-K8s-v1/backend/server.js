const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/mern-demo');

// Simple Model
const Message = mongoose.model('Message', { text: String });

// Insert initial data (in real app, do this separately)
Message.findOne().then(doc => {
  if (!doc) new Message({ text: 'Hello from MongoDB!' }).save();
});

// API Endpoint
app.get('/api/message', async (req, res) => {
  const message = await Message.findOne();
  res.json(message);
});

app.listen(5000, () => console.log('Backend running on port 5000'));