import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./Routes/AppRouter.tsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./Provider/SidebarProvider.tsx";
import ThemeProvider from "./Provider/ThemeProvider.tsx";
import WrokspaceJson from "./Provider/WrokspaceJson.tsx";
import SharespaceViewProvider from "./Provider/SharespaceViewProvider.tsx";
import FirstViewProvider from "./Provider/FirstViewProvider.tsx";
import ClickedSpaceProvider from "./Provider/ClickedSpaceProvider.tsx";
createRoot(document.getElementById("root")!).render(
    <ClickedSpaceProvider>


        <>
            <FirstViewProvider>

                <SharespaceViewProvider>
                    <WrokspaceJson>
                        <UserProvider>
                            <ThemeProvider>
                                <BrowserRouter>


                                    <AppRouter />



                                </BrowserRouter>

                            </ThemeProvider>

                        </UserProvider>
                    </WrokspaceJson>
                </SharespaceViewProvider>
            </FirstViewProvider>

        </>
    </ClickedSpaceProvider>


);