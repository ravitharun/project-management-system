import { useState } from "react";
import ClickedWorkSpace, { type contextClickedSpace } from "../Context/ClickedWorkSpace";

function ClickedSpaceProvider({ children }: { children: React.ReactNode }) {
    const [ClickedSpace, setClickedSpace] =
        useState<contextClickedSpace["ClickedSpace"]>([]);

    return (
        <ClickedWorkSpace.Provider
            value={{
                ClickedSpace,
                setClickedSpace,
            }}
        >
            {children}
        </ClickedWorkSpace.Provider>
    );
}

export default ClickedSpaceProvider;