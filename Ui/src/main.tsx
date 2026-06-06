import { createRoot } from "react-dom/client";
import "./index.css";
import FeatMaintenance from "./Components/FeatMaintance.tsx";
import AppRouter from "./Routes/AppRouter.tsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./Provider/SidebarProvider.tsx";
import ThemeProvider from "./Provider/ThemeProvider.tsx";
import WorkspaceProvider from "./Provider/WorkspaceProvider.tsx";
import WrokspaceJson from "./Provider/WrokspaceJson.tsx";
import SharespaceViewProvider from "./Provider/SharespaceViewProvider.tsx";
// import ShareViewProvider from "./Provider/ShareViewProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <WorkspaceProvider>
        <SharespaceViewProvider>
            <WrokspaceJson>
                <UserProvider>
                    <ThemeProvider>


                        <BrowserRouter>

                            <FeatMaintenance>

                                <AppRouter />

                            </FeatMaintenance>

                        </BrowserRouter>
                    </ThemeProvider>

                </UserProvider>
            </WrokspaceJson>
        </SharespaceViewProvider>
    </WorkspaceProvider>
);