export const timeFormatampm = (time: string) => {
    const hour = Number(time.split(":")[0]);
    const amPm = hour >= 12 ? "PM" : "AM";

    return `${time} ${amPm}`;
};