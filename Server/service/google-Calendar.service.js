const { google } = require("googleapis");
const WorkSpaceTasks = require("../Models/WorkSapceTask")
const createGoogleCalendarEvent = async ({
    title,
    Taskid,
    status,
    tags,
    description,
    priority,
    user_refresh_token,
    dueDate,
    estimatedHours,
    reminder,
    reminderBefore,
    task
}) => {
    try {

        console.log({
            "Dbtask":task,
            title,
            Taskid,
            status,
            tags,
            description,
            priority,
            user_refresh_token,
            dueDate,
            estimatedHours,
            reminderBefore,
            reminder
        }, 'heycheck');

        if (!user_refresh_token) {
            throw new Error("Google Calendar is not connected for this user.");
        }

        const auth = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );

        auth.setCredentials({
            refresh_token: user_refresh_token,
        });

        const calendar = google.calendar({
            version: "v3",
            auth,
        });

        const startDate = new Date(dueDate);
        const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 MIn

        const event = {
            summary: title,
            description: `
${description}

Task ID: ${Taskid}
Status: ${status}
Priority: ${priority}
Tags: ${Array.isArray(tags) ? tags.join(", ") : tags}
Estimated Hours: ${estimatedHours}
  `,
            start: {
                dateTime: startDate.toISOString(),
                timeZone: "Asia/Kolkata",
            },
            end: {
                dateTime: endDate.toISOString(),
                timeZone: "Asia/Kolkata",
            },

        }
        if (reminder) {
            event.reminders = {
                useDefault: false,
                overrides: [
                    {
                        method: "popup",
                        minutes: reminder.reminderBefore,
                    },
                ],
            };
        }

        const response = await calendar.events.insert({
            calendarId: "primary",
            requestBody: event,
        });

     

        const dt = await WorkSpaceTasks.findOneAndUpdate({ _id: task }, {
            googleEventId: response.data.id
        });


        console.log(dt, 'dt');



        return response.data;
    } catch (error) {
        console.error("Google Calendar Error:", error.message);

        throw error;
    }
};

module.exports = createGoogleCalendarEvent;