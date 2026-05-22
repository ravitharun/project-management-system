export const timeAgo = (date: string | number | Date) => {

    const seconds = Math.floor(
        (new Date().getTime() - new Date(date).getTime()) / 1000
    );
    const minutes = Math.floor(seconds / 60);

    const hours = Math.floor(minutes / 60);

    const days = Math.floor(hours / 24);




    if (seconds < 60) {
        return `${seconds} sec ago`;
    }
    if (minutes < 60) {
        return `${minutes} min ago`;
    }

    if (hours < 24) {
        return `${hours} hr ago`;
    }

    return `${days} day ago`;
};


export const CurrentDateFucntion = (GetDates: string) => {
    const TodayDate = new Date().toDateString();
    const date = new Date(GetDates).toDateString()
    if (TodayDate != date) {
        return date
    }
    else {
        return
    }
}

