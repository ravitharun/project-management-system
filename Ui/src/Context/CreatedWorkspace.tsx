import { createContext } from "react";
export type contextSpaceJson = {
    SpaceJson: any[],
    setspacejson: React.Dispatch<React.SetStateAction<[]>>;
}
const CreatedspaceData = createContext<contextSpaceJson | null>(null)
export default CreatedspaceData