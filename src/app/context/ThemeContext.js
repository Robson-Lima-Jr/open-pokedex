"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("light");

    function toggleTheme() {
        setTheme(prev => prev === "light" ? "dark" : "light" );
    }

    // usa na classe body 
    useEffect(() => {
        document.body.classList.remove("light_mode", "dark_mode");
        document.body.classList.add(`${theme}_mode`);
    },[theme]);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}