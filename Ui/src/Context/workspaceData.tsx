import { createContext } from "react";
type WorkspaceType = {
    work: any;
    setwork: React.Dispatch<React.SetStateAction<any>>;
};

const WorkspaceData = createContext<WorkspaceType | null>(null);

export default WorkspaceData;