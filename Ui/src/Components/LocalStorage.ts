export const getuserInfo: string | null  = localStorage.getItem("userinfo")
export const Token: string | null = localStorage.getItem("LoginToken")


export const checkuser = () => {
    if (Token == null) {
        return window.location.href = "/Login"
    }
}