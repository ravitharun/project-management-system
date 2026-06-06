import { createContext } from "react";
export type sharecontextSpaceJson = {
    SpaceJsonView: any[],
    setSpaceJsonView: React.Dispatch<React.SetStateAction<[]>>;
}
const SharespaceView = createContext<sharecontextSpaceJson | null>(null)
export default SharespaceView