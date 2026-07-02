const cron = require("node-cron");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const { BackupAlert } = require("./service/Backupemail");

const backupDir = path.join(__dirname, "backups");

if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

const runBackup = () => {
    const date = new Date().toISOString().split("T")[0];
    const command = `mongodump --uri="${process.env.MONGO_URI}" --archive="${backupDir}/backup-${date}.gz" --gzip`;

    exec(command, (error, stdout, stderr) => {
        if (error) {

            console.error("Backup failed:", error);
            BackupAlert(`Backup Failed: At ${date}`, "Failure")
            return;
        }
        BackupAlert(`Backup completed At${date}: backup-${date}.gz`, "SUCCESS")
        console.log(`Backup completed: backup-${date}.gz`);
    });
}

module.exports = runBackup