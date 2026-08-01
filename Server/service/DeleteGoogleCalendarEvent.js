const { google } = require("googleapis");
const DeleteGoogleCalendarEvent = async (googleEventId, user_refresh_token) => {

    try {
        console.log({ googleEventId, user_refresh_token });


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
        const response = await calendar.events.delete({
            calendarId: "primary",
            eventId: googleEventId,

        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error

    }
}


module.exports = DeleteGoogleCalendarEvent