import { useContext } from "react";
import SharespaceView from "../Context/ShareViewContext";
import bgthemeContext from "../Context/ThemeContext";


function Shareview(

) {
  const context = useContext(bgthemeContext);
  const { theme }: any = context
  const CreatedSharespaceView = useContext(SharespaceView);

  const { SpaceJsonView }: any = CreatedSharespaceView;
  console.log(SpaceJsonView, 'SpaceJsonViews')
  return (
    <>

      <div>Shareview -{theme}</div>
    </>
  )
}

export default Shareview