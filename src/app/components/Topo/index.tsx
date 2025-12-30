"use client";
import style from "./Topo.module.css";
import Link from "next/link";

export default function Topo () {
    return(
        <header className={style.fundo_topo}>
            <div className={style.logo}>
                <span>Pokédex</span>
            </div>

            <nav className={style.nav}>
                <Link href="/">Home</Link>
                <Link href="/pokedex">Pokédex</Link>
                <Link href="/games">Games</Link>
            </nav>

            <div className={style.container_tema}>
                <select aria-label="Tema">
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="yellow">Yellow</option>
                </select>
            </div>

            <button aria-label="Mudar modo">
                🌗
            </button>
        </header>
    )
}
