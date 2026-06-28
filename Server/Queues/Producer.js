const { Queue } = require("bullmq");
const connection = require("../config/redis");

const EmailQueue = new Queue("EmailServices", {
  connection,
});

module.exports = EmailQueue;