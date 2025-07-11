require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to the database when the server starts
client.connect();

// Endpoint to fetch column names and their counts
app.post('/api/columns', async (req, res) => {
  try {
    // Query to fetch column names
    const columnQuery = `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'cars';
    `;
    const columnResult = await client.query(columnQuery);
    const columns = columnResult.rows.map(row => row.column_name);


    // Construct the response object
    const response = {};
    for (const column of columns) {
      // Skip the 'car_name' column
      if (column === 'car_name') continue;

      // Construct the query to group by the column and count occurrences
      let query = `
        SELECT ${column}, COUNT(*) as count
        FROM cars
      `;

      // Check if there are parameters in the request
      const params = req.body;
      if (Object.keys(params).length > 0) {
        query += ' WHERE ';
        const conditions = [];

        for (const param in params) {
          conditions.push(`${param} = '${params[param]}'`);
        }

        query += conditions.join(' AND ');
      }
      query += `GROUP BY ${column}
      ORDER BY ${column}`

      // Execute the query
      const result = await client.query(query);

      // Store the result in the response object
      response[column] = result.rows.map(row => ({ value: row[column], count: row.count }));
    }

    res.json(response);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to filter cars based on parameters
app.post('/api/cars', async (req, res) => {
  try {
    let sqlQuery = 'SELECT * FROM cars';
    const params = req.body;

    if (Object.keys(params).length > 0) {
      sqlQuery += ' WHERE ';
      const conditions = [];

      for (const param in params) {
        conditions.push(`${param} = '${params[param]}'`);
      }

      sqlQuery += conditions.join(' AND ');
    }
    sqlQuery += ' ORDER BY car_name'
    const result = await client.query(sqlQuery);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});