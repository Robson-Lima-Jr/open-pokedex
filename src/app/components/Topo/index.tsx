"use client";
import { useState } from "react";
import styles from "./Topo.module.css";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/app/context/ThemeContext";
import { usePallete } from "@/app/context/PalleteContext";

export default function Topo() {
    // muda estado do menu no mobile
    const [menuOpen, setMenuOpen] = useState(false);
    // muda a cor do pallete para os temas de pokemon
    const {pallete, changePallete} = usePallete(); 
    // muda o fundo de light/dark e o loading
    const {theme, toggleTheme, loaded} = useTheme();

    // tipo 
    type Pallete = "red" | "blue" | "yellow";

    function toggleMenu() {
        setMenuOpen(prev => !prev);
    }

    return (
        <header className={styles.fundo_topo}>
            <div className={styles.container_base}>

                {/* logo do site */}
                <div className={styles.logo}>
                    <Link href="/">
                        <Image src="/pokeball-logo.png" alt="logo" width={45} height={45} className={styles.topo} />
                    </Link>
                </div>

                <button className={styles.menu_botao} onClick={toggleMenu} aria-label="Abrir menu">
                    ☰
                </button>

                {/* menu topo */}
                <nav className={`${styles.nav} ${menuOpen ? styles.nav_aberto : ""}`}>
                    <Link href="/" className={styles.link_nav}><span>▶ </span>HOME</Link>
                    <Link href="/pokedex" className={styles.link_nav}><span>▶ </span>POKéDEX</Link>
                    <Link href="/games" className={styles.link_nav}><span>▶ </span>JOGOS</Link>
                </nav>

                {/* mudar tema seguindo jogos pokemon classicos */}
                <div className={styles.container_paleta}>
                    <select aria-label="Paleta" 
                        className={styles.select_btn}
                        value={pallete}
                        onChange={(e) => changePallete(e.target.value as Pallete)}
                        >
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                    </select>
                </div>

                {/* tema de fundo. dark e light modes */}
                <div className={styles.mudar_tema}>
                    <button aria-label="Mudar Tema" className={styles.mode_btn} onClick={toggleTheme}>
                        {loaded && (theme === "dark" ? (
                            <Image
                                src="/icon-modes/solrock-2.webp"
                                alt="Dark Mode"
                                width={38}
                                height={38}
                                title="Mudar para Light Mode"
                            />
                        ) : (
                            <Image
                                src="/icon-modes/lunatone-2.webp"
                                alt="Light Mode"
                                width={38}
                                height={38}
                                title="Mudar para Dark Mode"
                            />
                        ))}
                    </button>
                </div>
            </div>
        </header>
    )
}
