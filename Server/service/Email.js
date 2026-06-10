
const { Resend } = require("resend");

 const resend = new Resend(process.env.RESEND_API);
if (process.env.RESEND_API === undefined) {
    console.log("process.env.RESEND_API === undefined")
}


const SendAccountCreationEmail = async (data) => {
    try {

        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: data?.email || "tr565003@gmail.com",
            subject: "Your Taskora Account Created Successfully",
            html: `
            <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
                
                <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden;">

                    <div style="background:#4f46e5; padding:20px; text-align:center;">
                        <h1 style="color:white; margin:0;">Taskora</h1>
                    </div>

                    <div style="padding:30px;">

                        <h2>Hello ${data?.name}, 👋</h2>

                        <p>
                            Your account has been created successfully in Taskora Project Management System.
                        </p>

                        <div style="background:#f9fafb; padding:15px; border-radius:8px; margin-top:20px;">
                            
                            <p>
                                <strong>Email:</strong> ${data?.email}
                            </p>
                        </div>

                        <p style="margin-top:20px;">
                            You can now login and manage your projects, tasks and teams.
                        </p>

                        <a 
                            href="https://taskora-system.netlify.app/login"
                            style="
                                display:inline-block;
                                margin-top:20px;
                                padding:12px 20px;
                                background:#4f46e5;
                                color:white;
                                text-decoration:none;
                                border-radius:6px;
                            "
                        >
                            Login Now
                        </a>

                    </div>

                    <div style="background:#111827; color:white; text-align:center; padding:15px;">
                        © 2026 Taskora System
                    </div>

                </div>

            </div>
            `,
        });

        console.log("Account Creation Email Sent", response);

    } catch (error) {
        console.log(error);
    }
};


// WELCOME EMAIL


const SendWelcomEmail = async (data) => {
    if (!data?.to) {
        console.log("To EmailId is required.")
        return "To EmailId is required."
    }

    try {

        const response = await resend.emails.send({
            from: "Taskora <onboarding@resend.dev>",
            to: data || 'tr565003@gmail.com',
            subject: "Welcome To Taskora ",
            html: `
            <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
                
                <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden;">

                    <div style="background:#16a34a; padding:20px; text-align:center;">
                        <h1 style="color:white;">Welcome To Taskora</h1>
                    </div>

                    <div style="padding:30px;">

                        <h2>Hello ${data?.name}, 👋</h2>

                        <p>
                            We are excited to have you onboard.
                        </p>

                        <p>
                            Taskora helps you:
                        </p>

                        <ul>
                            <li>Manage Projects</li>
                            <li>Assign Tasks</li>
                            <li>Track Progress</li>
                            <li>Collaborate With Teams</li>
                        </ul>

                        <a 
                            href="http://localhost:5173/dashboard"
                            style="
                                display:inline-block;
                                margin-top:20px;
                                padding:12px 20px;
                                background:#16a34a;
                                color:white;
                                text-decoration:none;
                                border-radius:6px;
                            "
                        >
                            Open Dashboard
                        </a>

                    </div>

                    <div style="background:#111827; color:white; text-align:center; padding:15px;">
                        Taskora Team
                    </div>

                </div>

            </div>
            `,
        });

        console.log("Welcome Email Sent", response.error);
        if (response.error) {

            throw new Error(response.error.message);

        }


    } catch (error) {
        console.log(error);
        throw error
    }

};

// TASK ASSIGNED EMAIL

const taskAssiginedEmail = async (data) => {

    try {

        const response = await resend.emails.send({
            from: "Taskora <taskoraSystem@resend.dev>",
            to: data?.email || 'tr565003@gmail.com',
            subject: "New Task Assigned ",
            html: `
            <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">

                <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden;">

                    <div style="background:#dc2626; padding:20px; text-align:center;">
                        <h1 style="color:white;">Task Assigned</h1>
                    </div>

                    <div style="padding:30px;">

                        <h2>Hello ${data?.employeeName}, </h2>

                        <p>
                            A new task has been assigned to you.
                        </p>

                        <div style="background:#f9fafb; padding:20px; border-radius:8px;">

                            <p>
                                <strong>Task:</strong> ${data?.taskTitle}
                            </p>

                            <p>
                                <strong>Project:</strong> ${data?.projectName}
                            </p>

                            <p>
                                <strong>Deadline:</strong> ${data?.deadline}
                            </p>

                            <p>
                                <strong>Priority:</strong> ${data?.priority}
                            </p>

                            <p>
                                <strong>Assigned By:</strong> ${data?.assignedBy}
                            </p>

                        </div>

                        <a 
                            href="http://localhost:5173/tasks"
                            style="
                                display:inline-block;
                                margin-top:20px;
                                padding:12px 20px;
                                background:#dc2626;
                                color:white;
                                text-decoration:none;
                                border-radius:6px;
                            "
                        >
                            View Task
                        </a>

                    </div>

                    <div style="background:#111827; color:white; text-align:center; padding:15px;">
                        Taskora Notification System
                    </div>

                </div>

            </div>
            `,
        });

        console.log("Task Assigned Email Sent", response);

    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    SendAccountCreationEmail,
    SendWelcomEmail,
    taskAssiginedEmail,
    resend
};