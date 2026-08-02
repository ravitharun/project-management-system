import { useState } from 'react'
import CreatedspaceData from '../Context/CreatedWorkspace'

function WrokspaceJson({ children }: any) {
    const [SpaceJson, setspacejson] = useState<any>([])
    return (
        <>


            <CreatedspaceData.Provider value={{ SpaceJson, setspacejson }}>

                {children}
            </CreatedspaceData.Provider>
        </>
    )
}

export default WrokspaceJson