export const getuserInfo: string | null = localStorage.getItem("userinfo")
export const Token: string | null = localStorage.getItem("LoginToken")
export const useremail: string | null = getuserInfo ? JSON.parse(getuserInfo).userEmail : null


// export const checkuser = () => {

//     const tokenRemove = localStorage.removeItem("LoginToken")
//     console.log(tokenRemove,'tkn rmv')
// };
export const checkuser = () => {

    const tokenRemove: any = localStorage.removeItem("LoginToken")
    const Removeuserinfo: any = localStorage.removeItem("userinfo")
    if (!tokenRemove && !Removeuserinfo) {
        return window.location.href = "/login"

    }
};