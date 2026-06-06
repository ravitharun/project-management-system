export const getuserInfo: string | null | any = localStorage.getItem("userinfo")
export const Token: string | null = localStorage.getItem("LoginToken")
export const useremail: string | null | any = getuserInfo ? JSON.parse(getuserInfo).userEmail : null

export const isInDev: boolean = true


export const Usertoekn = (navigate: any, toast: any) => {
    if (!Token) {
        toast.info("Login First To view Dashboard.")
        return navigate("/login")
    }
    return navigate(window.location.pathname)
}
// };
export const checkuser = () => {
    const tokenRemove: any = localStorage.removeItem("LoginToken")
    const Removeuserinfo: any = localStorage.removeItem("userinfo")
    if (!tokenRemove && !Removeuserinfo) {

        return window.location.href = "/login"
    }

    return window.location.href = "/"
};