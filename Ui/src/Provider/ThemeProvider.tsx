

import { useState } from "react";
import bgthemeContext, { type Theme } from "../Context/ThemeContext";


export default function ThemeProvider({ children }: any) {
  const [theme, settheme] = useState<Theme>("Dark");

  return (
    <bgthemeContext.Provider value={{ theme, settheme }}>
      {children}
    </bgthemeContext.Provider>
  );
}
