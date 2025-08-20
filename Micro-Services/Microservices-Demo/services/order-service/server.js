// server.js - order-service (fixed with retry & better logging)
import express from 'express';
import mysql from 'mysql2/promise';
import winston from 'winston';

const app = express();
const PORT = process.env.PORT || 4003;

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'order-service' },
  transports: [new winston.transports.Console()],
});

// Validate env vars
const requiredEnv = ['MYSQL_HOST', 'MYSQL_PORT', 'MYSQL_USER', 'MYSQL_PASS', 'MYSQL_DB'];
requiredEnv.forEach(key => {
  if (!process.env[key]) {
    logger.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

let connection = null;

// Retry connection
async function connectWithRetry() {
  const maxRetries = 10;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const conn = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
        connectTimeout: 5000,
        acquireTimeout: 5000,
      });

      connection = conn;
      logger.info('✅ Connected to MySQL');
      return;
    } catch (err) {
      retries++;
      const msg = err.message || 'Unknown error';
      logger.warn(`⚠️ MySQL connection failed (attempt ${retries}/${maxRetries}): ${msg}`);

      if (retries >= maxRetries) {
        logger.error('❌ Could not connect to MySQL after max retries');
        process.exit(1);
      }

      await new Promise(res => setTimeout(res, 5000)); // Wait 5s before retry
    }
  }
}

// Start connection
connectWithRetry();

// Routes
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'UP', service: 'order-service' });
});

app.get('/order', async (_, res) => {
  if (!connection) {
    logger.error('❌ No database connection available');
    return res.status(500).json({ error: 'Service not ready' });
  }

 try {
  const [rows] = await connection.execute("SELECT 'hey, this is order service from DB' AS message");
  res.json({ data: rows[0] });
} catch (err) {
  const msg = err.message || 'Unknown error';
  logger.error('❌ Query failed:', { error: msg });
  res.status(500).json({ error: 'Database error', detail: msg });
}
});

app.listen(PORT, () => {
  logger.info(`✅ order-service running on port ${PORT}`);
});