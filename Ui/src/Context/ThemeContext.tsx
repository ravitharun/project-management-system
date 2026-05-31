
export type Theme = "Dark" | "Light";

export type ThemeContextType = {
    theme: Theme;
    settheme: React.Dispatch<React.SetStateAction<Theme>>;
};




import { createContext } from "react";


const bgthemeContext = createContext<ThemeContextType | null>(null);

export default bgthemeContext;