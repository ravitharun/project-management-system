
export type toastTypes = "success" | "failure" | "waning" | undefined
export type Toast = {
    alertmessage: string,
    toastType?: toastTypes
    onclickevent?: () => void
}