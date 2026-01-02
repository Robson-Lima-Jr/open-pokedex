"use client";
import { useState } from "react";
import styles from "./Topo.module.css";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/app/context/ThemeContext";

export default function Topo() {
    const [menuOpen, setMenuOpen] = useState(false);
    const {theme, toggleTheme} = useTheme();

    function toggleMenu() {
        setMenuOpen(prev => !prev);
    }

    return (
        <header className={styles.fundo_topo}>
            <div className={styles.container_base}>

                {/* logo do site */}
                <div className={styles.logo}>
                    <Image src="/pokeball-logo.png" alt="logo" width={50} height={50} className={styles.topo} />
                </div>

                <button className={styles.menu_botao} onClick={toggleMenu} aria-label="Abrir menu">
                    ☰
                </button>

                {/* menu topo */}
                <nav className={`${styles.nav} ${menuOpen ? styles.nav_aberto : ""}`}>
                    <Link href="/" className={styles.link_nav}>Home</Link>
                    <Link href="/pokedex" className={styles.link_nav}>Pokédex</Link>
                    <Link href="/games" className={styles.link_nav}>Games</Link>
                </nav>

                {/* mudar tema seguindo jogos pokemon classicos */}
                <div className={styles.container_paleta}>
                    <select aria-label="Paleta" className={styles.select_btn}>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                    </select>
                </div>

                {/* tema de fundo. dark e light modes */}
                <div className={styles.mudar_tema}>
                    <button aria-label="Mudar Tema" className={styles.mode_btn} onClick={toggleTheme}>
                        {theme === "dark" ? (
                            <Image
                                src="/icon-modes/lunatone-2.webp"
                                alt="Dark Mode"
                                width={40}
                                height={40}
                            />
                        ) : (
                            <Image
                                src="/icon-modes/solrock-2.webp"
                                alt="Light Mode"
                                width={40}
                                height={40}
                            />
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}
