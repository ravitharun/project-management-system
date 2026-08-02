import { createContext } from "react";

type SidebarContextType = {
    sidebaropen: boolean;
    SetisSidebaropen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBarContext = createContext<SidebarContextType | null>(null);

export default SideBarContext;