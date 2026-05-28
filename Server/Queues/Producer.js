const { Queue } = require("bullmq");
const redis = require("../config/Ioredi");
// connection

const EmailQueue = new Queue("EmailServices", {
    connection: process.env.envStatus == 'prod' ? redis : { host: "localhost", port: 6379 }

});
// console.log(EmailQueue)
module.exports = EmailQueue;