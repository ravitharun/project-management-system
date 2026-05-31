import { createContext } from "react";

type SidebarContextType = {
    issidebaropen: boolean;
    setisSidebaropen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBarContext = createContext<SidebarContextType | null>(null);

export default SideBarContext;