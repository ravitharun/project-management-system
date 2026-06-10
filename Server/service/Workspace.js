const { resend } = require("./Email")

const workspaceAcceptInvitation = async (data) => {





    const response =


        data.data.arr_email.map(async (emails) => {

            console.log(emails, 'emailsemailsemails')

            await resend.emails.send({
                from: "Taskora <taskoraSystem@resend.dev>",
                to: emails || "tr565003@gmail.com",
                subject: "You're Invited to Join a Workspace",
                html: `

    < div style = "font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;" >

        <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px;">

            <h2 style="color: #333;">
                You're Invited to Join a Workspace
            </h2>

            <p style="font-size: 16px; color: #555;">
                You have been invited to join the workspace
                <strong>${data?._doc?.workspaceSetup?.workspaceName}</strong>
                on <strong>${data?._doc?.product}</strong>.
            </p>

            <p style="font-size: 15px; color: #666;">
                Click the button below to accept the invitation and join the workspace.
            </p>

            <div style="margin-top: 30px;">
                <a
                href=${process.env.envStatus === "dev"
                        ? "http://localhost:5000"
                        : "https://project-management-system-u091.onrender.com"
                    } / api / workspace / approve - workspace - invite ? workspaceid = ${data.data.workspace} & AcceptEmail=${emails}
                    style="
                        background: #4f46e5;
                        color: white;
                        padding: 14px 24px;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: bold;
                        display: inline-block;
                    "
                >
                    Join Workspace
                </a>
            </div>

            <p style="margin-top: 30px; font-size: 13px; color: #999;">
                If you did not expect this invitation, you can safely ignore this email.
            </p>

        </div>

    </div >

    `
            })
        })
}

module.exports = { workspaceAcceptInvitation }