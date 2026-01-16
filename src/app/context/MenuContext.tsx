'use client';
import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from "next/navigation";

type MenuContextType = {
    menuOpen: boolean
    toggleMenu: () => void
    closeMenu: () => void
};

const MenuContext = createContext<MenuContextType | null> (null);

export function MenuProvider({ children }: { children: React.ReactNode}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathName = usePathname();

    function toggleMenu() {
        setMenuOpen(prev => !prev)
    }

    function closeMenu() {
        setMenuOpen(false)
    }

    // muda o estado do menu ao fechar
    useEffect(() => {
        setMenuOpen(false)
    }, [pathName])

    return (
        <MenuContext.Provider value={{menuOpen, toggleMenu, closeMenu}}>
            {children}
        </MenuContext.Provider>
    )
}

export function useMenu() {
    const context = useContext(MenuContext);

    if(!context) {
        throw new Error('useMenu deve ser usado dentro do MenuProvider')
    }

    return context;
}