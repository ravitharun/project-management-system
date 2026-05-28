require("dotenv").config({
    path: require("path").resolve(__dirname, "../.env"),
});

const { Worker } = require("bullmq");
const redis = require("../config/Ioredi"); // ✅ FIX THIS PATH
const {
    SendAccountCreationEmail,
    SendWelcomEmail,
} = require("../service/Email");

const isProd = process.env.envStatus === "Prod";

const worker = new Worker(
    "EmailServices",
    async (job) => {
        try {
            console.log("Attempt:", job.attemptsMade + 1);

            if (job.name === "SendAccountCreationEmail") {
                return await SendAccountCreationEmail(job.data);
            }

            if (job.name === "SendWelcomEmail") {
                console.log("Sending Welcome Email");
                return await SendWelcomEmail(job.data);
            }

            throw new Error(`Unknown job name: ${job.name}`); // ✅ IMPORTANT
        } catch (error) {
            console.log("Worker Error:", error.message);
            throw error;
        }
    },
    {
        connection: isProd == 'Prod'
            ? redis
            : { host: "127.0.0.1", port: 6379 },
    }
);

worker.on("failed", (job, err) => {
    console.log("❌ FAILED JOB");
    console.log("Job ID:", job.id);
    console.log("Attempts:", job.attemptsMade);
    console.log(err.message);
});

worker.on("completed", (job) => {
    console.log("✅ JOB COMPLETED");
    console.log("Job ID:", job.id);
});

module.exports = worker;