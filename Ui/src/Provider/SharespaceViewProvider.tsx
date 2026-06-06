import { useState } from "react"
import SharespaceView from "../Context/ShareViewContext"



function SharespaceViewProvider({ children }: any) {
    const [SpaceJsonView, setSpaceJsonView] = useState<any>()
    return (
        <>

            <SharespaceView.Provider value={{ SpaceJsonView, setSpaceJsonView }}>


                {children}
            </SharespaceView.Provider>
        </>
    )
}

export default SharespaceViewProvider