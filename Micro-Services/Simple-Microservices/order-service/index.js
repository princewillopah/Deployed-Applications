const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 4003;
const MYSQL_URI = process.env.MYSQL_URI || "mysql://root:root@mysql-order:3306/orders";

let connection;
mysql.createConnection(MYSQL_URI)
  .then(conn => {
    connection = conn;
    console.log("✅ Connected to MySQL (Order Service)");
  })
  .catch(err => console.error(err));

app.get("/", async (req, res) => {
  res.json({ message: "Hey, this is Order Service from MySQL!" });
});

app.listen(PORT, () => console.log(`🚀 Order service running on port ${PORT}`));
