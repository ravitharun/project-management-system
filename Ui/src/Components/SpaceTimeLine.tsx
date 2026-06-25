import { useContext } from "react";
import bgthemeContext from "../Context/ThemeContext";

function SpaceTimeLine() {
   const context = useContext(bgthemeContext);
      const { theme }: any = context
  return (
    <div>SpaceTimeLine-{theme}</div>
  )
}

export default SpaceTimeLine