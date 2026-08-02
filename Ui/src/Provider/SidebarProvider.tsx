import {  useState } from "react";
import SideBarContext from "../Context/SideBard";



const UserProvider = ({ children }: any) => {

    const [sidebaropen, SetisSidebaropen] = useState(false);

    return (
     <SideBarContext.Provider
        value={{ sidebaropen, SetisSidebaropen }}
        >
        {children}
        </SideBarContext.Provider>
    );
};

export default UserProvider;