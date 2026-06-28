// // // const IORedis = require("ioredis");

// // // const redis = new IORedis(process.env.REDIS_URL, {
// // //   maxRetriesPerRequest: null,
// // //   tls: {
// // //     rejectUnauthorized: false,
// // //   },
// // // });
// // const IORedis = require("ioredis");

// // const redis = new IORedis(process.env.REDIS_URL, {
// //   maxRetriesPerRequest: null,
// // });

// // module.exports = redis;
// // redis.on("error", (err) => {
// //   console.error("Redis Error:", err);
// // });

// // module.exports = redis;
// const IORedis = require("ioredis");

// const isProd = process.env.NODE_ENV === "Prod";

// const redis = new IORedis(process.env.REDIS_URL, {
//   maxRetriesPerRequest: null,
//   tls: process.env.REDIS_URL?.startsWith("rediss://")
//     ? {}
//     : undefined,
// });

// redis.on("error", (err) => {
//   console.error("Redis Error:", err);
// });

// module.exports = redis;


const IORedis = require("ioredis");

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

connection.on("connect", () => {
  console.log("Redis connected");
});

connection.on("error", (err) => {
  console.error("Redis Error:", err);
});

module.exports = connection;