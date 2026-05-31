import {  useState } from "react";
import SideBarContext from "../Context/SideBard";



const UserProvider = ({ children }: any) => {

    const [issidebaropen, setisSidebaropen] = useState(false);

    return (
     <SideBarContext.Provider
        value={{ issidebaropen, setisSidebaropen }}
        >
        {children}
        </SideBarContext.Provider>
    );
};

export default UserProvider;