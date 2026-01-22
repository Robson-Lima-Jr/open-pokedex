"use client";
import { useState } from "react";
import styles from "./pokedex.module.css";
import PokedexAside from "../components/PokedexAside";
import PokemonCard from "../components/PokemonCard";
import { IconeFiltro, IconePokeball, IconeSeta } from "../components/icons/Icons";

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

                {/* criar o fundo clicavel pro apos o aside abrir no mobile */}
                {asideOpen && (
                    <div className={styles.overlay}
                         onClick={closeAside}
                         aria-hidden="true">
                    </div>
                )}

                <div className={`container_base ${styles.conteudo_dex}`}>
                    <div className={`titulo_area ${styles.config_area}`}>
                        <div>
                            <h1 className="titulo_h1">
                                <IconePokeball className="h1_icone"/>
                                <span>Pokédex</span>
                            </h1>
                            <p className="paragrafo_h1">Database</p>
                        </div>

                        <button onClick={toggleAside}
                            className={styles.botao_filtro}
                            aria-label="Abrir Filtro">
                                <IconeFiltro className={styles.icone_filtro}/>
                        </button>
                    </div>

                    <section className={`section_main ${styles.container_pokedex}`}>
                        <h2 className="subtitulo_h2"><IconeSeta className="h2_icone" /><span>Nacional Dex</span></h2>

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