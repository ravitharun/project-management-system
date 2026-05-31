import { createRoot } from "react-dom/client";
import "./index.css";
import FeatMaintenance from "./Components/FeatMaintance.tsx";
import AppRouter from "./Routes/AppRouter.tsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./Provider/SidebarProvider.tsx";
import ThemeProvider from "./Provider/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(

    <UserProvider>
        <ThemeProvider>


            <BrowserRouter>

                <FeatMaintenance>

                    <AppRouter />

                </FeatMaintenance>

            </BrowserRouter>
        </ThemeProvider>

    </UserProvider>

);