// server.js - review-service
import express from 'express';
import { createClient } from 'redis';
import winston from 'winston';

const app = express();
const PORT = process.env.PORT || 4004;

const serviceName = 'review-service'; // ← Change per service
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

const client = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379',
});

client.on('error', (err) => logger.error('Redis Client Error', err));
client.connect().catch((err) => logger.error('Redis connect error:', err));

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'UP', service: 'review-service' });
});

app.get('/review', async (_, res) => {
  try {
    const value = await client.get('reviewMessage');
    if (value) {
      res.json({ data: { message: value } });
    } else {
      await client.set('reviewMessage', 'hey, this is review service from DB');
      res.json({ data: { message: 'hey, this is review service from DB' } });
    }
  } catch (err) {
    logger.error('Redis error:', err.message);
    res.status(500).json({ error: 'Redis error' });
  }
});

app.listen(PORT, () => {
  logger.info(`✅ review-service running on port ${PORT}`);
});