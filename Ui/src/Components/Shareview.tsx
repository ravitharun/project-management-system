import { useContext } from "react";
import SharespaceView from "../Context/ShareViewContext";


function Shareview({ theme }: any) {
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