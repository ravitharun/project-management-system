export const getuserInfo: string | null = localStorage.getItem("userinfo")
export const Token: string | null = localStorage.getItem("LoginToken")
export const useremail: string | null = getuserInfo ? JSON.parse(getuserInfo).userEmail : null



export const Usertoekn = (navigate: any, toast: any) => {
    // console.log(Token,'TokenToken')
    if (!Token) {
        toast.info("Login First To view Dashboard.")
        return navigate("/login")
    }
    return navigate("/")
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