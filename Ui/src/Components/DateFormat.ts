    export const GetDateFormat = (date:  string | number | Date) => {


        if (!date) return "-"
        const a = new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            // hour: "2-digit",
            // minute: "2-digit",
        });
   
        
        return a
        
    }

export const GetDueDays = (endDate: string | number | Date) => {
    const today = new Date();
    const end = new Date(endDate);

    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return Math.ceil(
        (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
};


  export const DueDate = ( endDate:any|String|number) => {
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