"use client";
import { useState } from "react";
import styles from "./pokedex.module.css";
import PokedexAside from "../components/PokedexAside";
import PokemonCard from "../components/PokemonCard";

export default function pokedex() {
    const [asideOpen, setAsideOpen] = useState(false);

    function toggleAside() {
        setAsideOpen(prev => !prev);
    };

    function closeAside() {
        setAsideOpen(false);
    }

    return (
        <main >
            <div className={styles.layout_pokedex}>
                <PokedexAside isOpen={asideOpen} closeAside={closeAside}/>

                <div className={`container_base ${styles.conteudo_dex}`}>
                    <div className="titulo_area">
                        <h1 className="titulo_h1">
                            <span className="h1_icone">◓</span>

                            <span>Pokédex</span>
                        </h1>

                        <p className="paragrafo_h1">Database</p>

                        <button onClick={toggleAside}
                            className={styles.botao_filtro}
                            aria-label="Abrir Filtro">
                                ⏷
                        </button>
                    </div>

                    <section className={`section_main ${styles.container_pokedex}`}>
                        <h2 className="subtitulo_h2">▶ Nacional Dex</h2>

                        <div className={styles.teste_dex}>
                            <PokemonCard />
                            <PokemonCard />
                            <PokemonCard />
                            <PokemonCard />
                            <PokemonCard />
                            <PokemonCard />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}