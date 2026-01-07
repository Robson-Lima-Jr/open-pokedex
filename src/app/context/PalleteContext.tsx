"use client";
import {createContext, useContext, useState, ReactNode, useEffect} from "react";

// tipo do contexto
type PalleteContextType = {
    pallete: "red" | "blue" | "yellow";
    changePallete: (value: "red" | "blue" | "yellow") => void;
};

// cria o contexto usando o tipo acima
const PalleteContext = createContext<PalleteContextType | null>(null); 

type PalleteProviderProps = {
    children: ReactNode;
};

export function PalleteProvider({children}: PalleteProviderProps) {
    const [pallete, setPallete] = useState<"red" | "blue" | "yellow">(() => {
        if(typeof window !== "undefined") {
            return(localStorage.getItem("pallete") as "red" | "blue" | "yellow") || "red";
        };

        return "red";
    });

    function changePallete(value: "red" | "blue" | "yellow") {
        setPallete(value);
    }

    // usar na classe body
    useEffect(() => {
        document.body.classList.remove("pallete_red", "pallete_blue", "pallete_yellow");
        document.body.classList.add(`pallete_${pallete}`);

        localStorage.setItem("pallete", pallete);
    }, [pallete]);

    return (
        <PalleteContext.Provider value={{ pallete, changePallete }} >
            {children}
        </PalleteContext.Provider>
    );
}

export function usePallete() {
    const context = useContext(PalleteContext);

    if(!context) {
        throw new Error("usePallete deve ser usado dentro de PalleteProvider");
    };

    return context;
}
