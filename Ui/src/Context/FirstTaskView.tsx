import { createContext } from "react";

export type FIrstViewTaks = {
  Tasks: any | null;
  setasks: React.Dispatch<React.SetStateAction<any | null>>;
};

const ViewTaskFirst = createContext<FIrstViewTaks | null>(null);


export default ViewTaskFirst