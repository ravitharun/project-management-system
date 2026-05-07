
// Build personalized project notification message
export const formatProjectNotification = (data: any, useremail: string | null) => {
    console.log(data, "data");

    if (useremail === data.userinof) {
        return `You have uploaded the project files ${data.projectid}`;
    }

    return data.message;
};