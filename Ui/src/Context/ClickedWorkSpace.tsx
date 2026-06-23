import { createContext } from "react";

export type contextClickedSpace = {
    ClickedSpace: any[] | null;
    setClickedSpace: React.Dispatch<React.SetStateAction<any[] | null>>;
};

const ClickedWorkSpace = createContext<contextClickedSpace | null>(null);

export default ClickedWorkSpace;