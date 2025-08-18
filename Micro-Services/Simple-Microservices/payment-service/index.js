const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4005;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo-user:27017/payments";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB (Payment Service)"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.json({ message: "Hey, this is Payment Service from MongoDB!" });
});

app.listen(PORT, () => console.log(`🚀 Payment service running on port ${PORT}`));
