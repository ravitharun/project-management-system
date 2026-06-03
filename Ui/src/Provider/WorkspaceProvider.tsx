import { useState } from "react"
import WorkspaceData from "../Context/workspaceData"

function WorkspaceProvider({ children }: any) {
    const [work, setwork] = useState([])
    console.log(work,'from provider')
    return (
        <>

            <WorkspaceData.Provider value={{ work, setwork } }>
                { children }
            </WorkspaceData.Provider >


        </>)
}

export default WorkspaceProvider