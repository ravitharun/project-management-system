    export const GetDateFormat = (date: any) => {
        console.log(date, 'GetDateFormat');

        if (!date) return "-"
        const a = new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            // hour: "2-digit",
            // minute: "2-digit",
        });
        console.log(a,'tharun');
        
        return a
        
    }




  export const DueDate = ( endDate:any) => {
    const today:any = new Date();
    const end :any= new Date(endDate);

    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
        return `${diffDays} days left`;
    } else if (diffDays === 0) {
        return "Ends today";
    } else {
        return `Ended ${Math.abs(diffDays)} days ago`;
    }
};