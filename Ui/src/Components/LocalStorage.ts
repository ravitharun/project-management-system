export const getuserInfo: string | null = localStorage.getItem("userinfo")
export const Token: string | null = localStorage.getItem("LoginToken")
export const useremail: string | null = getuserInfo ? JSON.parse(getuserInfo).userEmail : null


export const checkuser = (navigate:any) => {

    if (Token == null) {
        navigate("/Login");
    }
};