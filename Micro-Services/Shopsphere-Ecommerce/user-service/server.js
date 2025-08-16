// user-service/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import { protect } from './middleware/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);

// Add this line after app.use('/api/users', userRoutes);
app.get('/test', (req, res) => {
  res.json({ message: 'Test route works' });
});
// DB & Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`User Service running on port ${PORT}`);
});