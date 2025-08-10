require('dotenv').config(); // Load environment variables from config
const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
const app = express()
const port = process.env.PORT || 5000; // Default port if MONGO_URI is not set

const cors = require('cors')
const router = require('./Routes/router')

app.use(cors());
app.use(express.json());
// for liveness Probe
app.get('/health', (req, res) => res.send('OK'));
// app.use(router);
app.use('/api', router);

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`);
});








