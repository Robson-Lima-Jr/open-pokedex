"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// tipo do contexto
type ThemeContextType = {
    theme: "light" | "dark";
    toggleTheme: () => void;
    loaded: boolean;
}

// cria contexto com o tipo usado acima, pode ser null no começo
const ThemeContext = createContext<ThemeContextType | null>(null);


type ThemeProviderProps = {
    children: ReactNode;
}

export function ThemeProvider({children}: ThemeProviderProps) {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if(typeof window !== "undefined") {
            return (localStorage.getItem("theme") as "light" | "dark") || "light";
        };

        return "light";
    });

    const [loaded, setLoaded] = useState(false);

    function toggleTheme() {
        setTheme(prev => prev === "light" ? "dark" : "light" );
    }

    // usa na classe body 
    useEffect(() => {
        document.body.classList.remove("light_mode", "dark_mode");
        document.body.classList.add(`${theme}_mode`);

        localStorage.setItem("theme", theme);
        setLoaded(true);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme, loaded}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if(!context) {
        throw new Error("useTheme deve ser usado dentro de ThemeProvider");
    }

    return context;
}