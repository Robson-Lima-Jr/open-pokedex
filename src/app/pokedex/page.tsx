"use client";
import { useEffect, useState } from "react";
import styles from "./pokedex.module.css";
import PokedexAside from "../components/PokedexAside";
import PokemonCard from "../components/PokemonCard";
import PokemonLista from "../components/PokemonLista";
import { IconeFiltro, IconePokeball, IconeSeta, IconeCard, IconeLista } from "../components/icons/Icons";

export default function pokedex() {
    // aside
    const [asideOpen, setAsideOpen] = useState(false);
    // viewmode dos botoes
    const [viewMode, setViewMode] = useState<"card" | "list">("card");
    // pokemons
    const [pokemonsBase, setPokemonsBase] = useState<any[]>([]);
    // loading
    const [loading, setLoading] = useState(true);

    function toggleAside() {
        setAsideOpen(prev => !prev);
    };

    function closeAside() {
        setAsideOpen(false);
    }

    // travar a tela quando o overlay estiver ativo
    useEffect(() => {
        if (asideOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [asideOpen]);

    // busca de pokemons na api oficial
    useEffect(() => {
        async function fetchPokemons() {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
                const data = await response.json();

                const detailedPokemons = await Promise.all(
                    data.results.map(async (pokemon: { url: string }) => {
                        const res = await fetch(pokemon.url);
                        return res.json();
                    })
                );

                setPokemonsBase(detailedPokemons);
            } catch (error) {
                console.error("Erro ao buscar Pokémon:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemons();
    }, []);

    return (
        <main >
            <div className={styles.layout_pokedex}>
                <PokedexAside isOpen={asideOpen} closeAside={closeAside} />

                {/* criar o fundo clicavel pro apos o aside abrir no mobile */}
                {asideOpen && (
                    <div className={styles.overlay}
                        onClick={closeAside}
                        aria-hidden="true">
                    </div>
                )}

                <div className={`container_base ${styles.conteudo_dex}`}>
                    {/* h1 */}
                    <div className={`titulo_area ${styles.config_area}`}>
                        <div>
                            <h1 className="titulo_h1">
                                <div className="icone_wrap">
                                    <IconePokeball className="h1_icone" />
                                </div>

                                <span className="texto_titulo">Pokédex</span>
                            </h1>

                            <p className="paragrafo_h1">Database</p>
                        </div>

                        {/* botao filtro */}
                        <button onClick={toggleAside}
                            className={styles.botao_filtro}
                            aria-label="Abrir Filtro">
                            <IconeFiltro className={styles.icone_filtro} />
                        </button>
                    </div>
                    
                    {/* subtitulo */}
                    <section className={`section_main ${styles.container_pokedex}`}>
                        <h2 className="subtitulo_h2">
                            <div className="icone_wrap">
                                <IconeSeta className="h2_icone" />
                            </div>

                            <span className="texto_titulo">Nacional Dex</span>
                        </h2>

                        {/* botoes de exibição da dex */}
                        <div className={styles.view_toggle}>
                            <button onClick={() => setViewMode("card")}
                                className={viewMode === "card" ? styles.ativo : ""}
                            >
                                <IconeCard className={styles.icone_botao} />Cards
                            </button>

                            <button onClick={() => setViewMode("list")}
                                className={viewMode === "list" ? styles.ativo : ""}
                            >
                                <IconeLista className={styles.icone_botao} />Lista
                            </button>
                        </div>

                        {/* exibição card/lista */}
                        {viewMode === "card" ? (
                            <div className={styles.container_card}>
                                <div className={styles.card_dex}>
                                    {loading ? (
                                        <p className={styles.loading}>Carregando...</p>
                                    ) : (
                                        pokemonsBase.map((pokemon) => (
                                            <PokemonCard
                                                key={pokemon.id}
                                                pokemon={pokemon} />
                                        ))
                                    )}
                                </div>
                            </div>

                        ) : (

                            <div className={styles.lista_dex}>
                                {loading ? (
                                    <p className={styles.loading}>Carregando...</p>
                                ) : (
                                    pokemonsBase.map((pokemon) => (
                                        <PokemonLista 
                                            key={pokemon.id}
                                            pokemon={pokemon} />
                                    ))
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}