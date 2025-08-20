// server.js - product-service
import express from 'express';
import { MongoClient } from 'mongodb';
import winston from 'winston';

const app = express();
const PORT = process.env.PORT || 4002;

const serviceName = 'product-service'; // ← Change per service
// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: serviceName },
  transports: [new winston.transports.Console()],
});

let db;
async function connectDB() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://mongo:27017');
  await client.connect();
  db = client.db('productsdb');
  logger.info('Connected to MongoDB');
}

connectDB().catch((err) => logger.error('MongoDB init failed:', err));

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'UP', service: 'product-service' });
});

app.get('/product', async (_, res) => {
  try {
    const data = await db.collection('info').findOne({}, { projection: { _id: 0 } });
    res.json({ data: data || { message: 'hey, this is product service from DB' } });
  } catch (err) {
    logger.error('DB query failed:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  logger.info(`✅ product-service running on port ${PORT}`);
});