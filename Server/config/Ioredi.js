const IORedis = require("ioredis");

const redis = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  tls: {
    rejectUnauthorized: false,
  },
});

redis.on("error", (err) => {
  console.error("Redis Error:", err);
});

module.exports = redis;