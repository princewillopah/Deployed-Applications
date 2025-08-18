const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo-user:27017/users";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB (User Service)"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.json({ message: "Hey, this is User Service from MongoDB!" });
});

app.listen(PORT, () => console.log(`🚀 User service running on port ${PORT}`));
