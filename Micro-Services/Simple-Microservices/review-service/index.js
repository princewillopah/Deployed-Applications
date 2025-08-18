const express = require("express");
const redis = require("redis");

const app = express();
const PORT = process.env.PORT || 4004;
const REDIS_URL = process.env.REDIS_URL || "redis://redis-review:6379";

const client = redis.createClient({ url: REDIS_URL });
client.connect()
  .then(() => console.log("✅ Connected to Redis (Review Service)"))
  .catch(err => console.error(err));

app.get("/", async (req, res) => {
  await client.set("review-msg", "Hey, this is Review Service from Redis!");
  const msg = await client.get("review-msg");
  res.json({ message: msg });
});

app.listen(PORT, () => console.log(`🚀 Review service running on port ${PORT}`));
