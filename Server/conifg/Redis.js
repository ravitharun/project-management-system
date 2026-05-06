const { createClient } = require("redis");

const client = createClient();

const connectRedis = async () => {
    try {
        client.on("error", (err) => {
            console.log("Redis Client Error:", err);
        });

        await client.connect();
        console.log("Redis Connected");
    } catch (error) {
        console.log(" Redis Connection Failed:", error);
    }
};

module.exports = { connectRedis, client };