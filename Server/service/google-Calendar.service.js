const { google } = require("googleapis");

const createGoogleCalendarEvent = async ({
    title,
    description,
    dueDate,
    user_refresh_token,
}) => {
    try {
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
        const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 minutes

        const event = {
            summary: title,
            description: description,
            start: {
                dateTime: startDate.toISOString(),
                timeZone: "Asia/Kolkata",
            },
            end: {
                dateTime: endDate.toISOString(),
                timeZone: "Asia/Kolkata",
            },
        };

        const response = await calendar.events.insert({
            calendarId: "primary",
            requestBody: event,
        });

        return response.data;
    } catch (error) {
        console.error("Google Calendar Error:", error.message);

        throw error;
    }
};

module.exports = createGoogleCalendarEvent;