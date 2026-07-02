require("dotenv").config();
const { Resend } = require("resend");


const resend = new Resend(process.env.RESEND_API);


const BackupAlert = async (data, backupStatus) => {
    try {
        const response = await resend.emails.send({
            from: "Backup System <onboarding@resend.dev>",
            to: "tr565003@gmail.com",
            subject: "MongoDB Backup Status Report",

            html: `
<div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 30px;">

  <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background: ${backupStatus === 'SUCCESS' ? '#16a34a' : '#dc2626'}; padding: 20px; color: white;">
      <h2 style="margin: 0;">🗄️ MongoDB Backup Report</h2>
      <p style="margin: 5px 0 0;">Automated System Notification</p>
    </div>

    <!-- Body -->
    <div style="padding: 20px;">

      <p style="font-size: 15px; color: #333;">
        Hello Developer 👋,<br/>
        Your scheduled MongoDB backup has been executed.
      </p>

      <!-- Status Box -->
      <div style="
        margin-top: 15px;
        padding: 15px;
        border-radius: 8px;
        background: ${backupStatus === 'SUCCESS' ? '#ecfdf5' : '#fef2f2'};
        border-left: 6px solid ${backupStatus === 'SUCCESS' ? '#16a34a' : '#dc2626'};
      ">
        <strong>Status:</strong> 
        <span style="color: ${backupStatus === 'SUCCESS' ? '#16a34a' : '#dc2626'}; font-weight: bold;">
          ${backupStatus}
        </span>
      </div>

      <!-- Backup Details -->
      <div style="margin-top: 20px;">
        <h4 style="margin-bottom: 8px;">📦 Backup Details</h4>
        <div style="
          background: #f9fafb;
          padding: 12px;
          border-radius: 6px;
          font-size: 13px;
          color: #444;
          white-space: pre-wrap;
        ">
${data}
        </div>
      </div>

      <!-- Info -->
      <div style="margin-top: 20px; font-size: 13px; color: #666;">
        ⏰ Time: ${new Date().toLocaleString()} <br/>
        🔐 System: Automated MongoDB Backup System (MERN Stack)
      </div>

    </div>

    <!-- Footer -->
    <div style="padding: 15px; text-align: center; font-size: 12px; color: #999; background: #f9fafb;">
      This is an automated email. Do not reply.
    </div>

  </div>
</div>
`
        });

        console.log("Backup email sent successfully");
        return response;

    } catch (error) {
        console.error("Email error:", error.message);
    }
};

module.exports = BackupAlert;