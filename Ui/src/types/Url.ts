export const LiveUi = import.meta.env.VITE_Prod == "Local" ? "http://localhost:5173/" : import.meta.env.VITE_Ui_API


export const ActionUrl = (Task_Type: any, TaskID: any, PorjectId: any) => {
    const url = `${LiveUi}?Task_Type=${Task_Type}&TaskID=${TaskID}&PorjectId=${PorjectId}`
    return url
}