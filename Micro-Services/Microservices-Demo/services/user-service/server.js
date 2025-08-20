// server.js - user-service (production-ready with retry)

import express from 'express';
import { Client } from 'pg';
import winston from 'winston';

const app = express();
const PORT = process.env.PORT || 4001;
const serviceName = 'user-service';

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

// Validate required environment variables
const requiredEnv = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASS', 'DB_NAME'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    logger.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

let client = null;

// Retry connection to PostgreSQL
async function connectWithRetry() {
  const maxRetries = 10;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      client = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });

      await client.connect();
      logger.info('✅ Connected to PostgreSQL');
      return;
    } catch (err) {
      retries++;
      const msg = err.message || 'Unknown error';
      logger.warn(`⚠️ PostgreSQL connection failed (attempt ${retries}/${maxRetries}): ${msg}`);

      if (retries >= maxRetries) {
        logger.error('❌ Could not connect to PostgreSQL after max retries');
        process.exit(1);
      }

      // Wait 5 seconds before retry
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

// Start connection
connectWithRetry();

// Health check
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'UP', service: 'user-service' });
});

// Data route
app.get('/user', async (_, res) => {
  if (!client) {
    logger.error('❌ No database connection available');
    return res.status(500).json({ error: 'Service not ready' });
  }

  try {
    const result = await client.query("SELECT 'hey, this is user service from MySQL DB' AS message");
    res.json({ data: result.rows[0] });
  } catch (err) {
    const msg = err.message || 'Unknown error';
    logger.error('❌ DB query failed:', { error: msg });
    res.status(500).json({ error: 'Database error', detail: msg });
  }
});

// Start server
app.listen(PORT, () => {
  logger.info(`✅ ${serviceName} running on port ${PORT}`);
});