const express = require("express");
const { Client } = require("pg");

const app = express();
const PORT = process.env.PORT || 4006;
const PG_URI = process.env.PG_URI || "postgres://user:pass@postgres-product:5432/inventory";

const client = new Client({ connectionString: PG_URI });
client.connect()
  .then(() => console.log("✅ Connected to PostgreSQL (Inventory Service)"))
  .catch(err => console.error(err));

app.get("/", async (req, res) => {
  res.json({ message: "Hey, this is Inventory Service from PostgreSQL!" });
});

app.listen(PORT, () => console.log(`🚀 Inventory service running on port ${PORT}`));
