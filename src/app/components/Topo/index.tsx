"use client";
import { useState } from "react";
import styles from "./Topo.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Topo() {
    const [menuOpen, setMenuOpen] = useState(false);
    
    function toggleMenu() {
        setMenuOpen(prev => !prev);
    }

    function toggleMode() {
        document.body.classList.toggle("dark_mode");
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
                <div className={styles.container_tema}>
                    <select aria-label="Tema" className={styles.select_btn}>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                    </select>
                </div>

                {/* tema de fundo. dark e light modes */}
                <div className={styles.mudar_fundo}>
                    <button aria-label="Mudar modo" className={styles.select_btn}>
                        🌗
                    </button>
                </div>
            </div>
        </header>
    )
}
