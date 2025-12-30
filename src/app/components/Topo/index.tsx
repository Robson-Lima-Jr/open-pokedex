"use client";
import styles from "./Topo.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Topo() {
    return (
        <header className={styles.fundo_topo}>
            <div className={styles.container_base}>
                <div className={styles.logo}>
                    <Image src="/pokeball-logo.png" alt="logo" width={50} height={50} className={styles.topo} />
                </div>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.link_nav}>Home</Link>
                    <Link href="/pokedex" className={styles.link_nav}>Pokédex</Link>
                    <Link href="/games" className={styles.link_nav}>Games</Link>
                </nav>

                <div className={styles.container_tema}>
                    <select aria-label="Tema" className={styles.select_btn}>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                    </select>
                </div>

                <button aria-label="Mudar modo" className={styles.select_btn}>
                    🌗
                </button>
            </div>
        </header>
    )
}
