import { useState } from "react";
import ViewTaskFirst from "../Context/FirstTaskView";

function FirstViewProvider({ children }: any) {
    const [Tasks, setasks] = useState<any | null>(null);

    return (


        <>


            <ViewTaskFirst.Provider
                value={{
                    Tasks,
                    setasks,
                }}
            >
                {children}
            </ViewTaskFirst.Provider>
        </>
    )
}

export default FirstViewProvider;