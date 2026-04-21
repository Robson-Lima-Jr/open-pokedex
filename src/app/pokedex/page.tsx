"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "./pokedex.module.css";
import PokedexAside from "../components/PokedexAside";
import PokemonCard from "../components/PokemonCard";
import PokemonLista from "../components/PokemonLista";
import BotaoFly from "../components/BotaoFly";
import regions from "@/app/data/regions"
import { IconeFiltro, IconePokeball, IconeSeta, IconeCard, IconeLista } from "../components/icons/Icons";
import { usePokemonList } from "../hooks/usePokemonList";

export default function Pokedex() {
    // variaveis importadas de hooks, pra conexao com api
    const { pokemons, isInitialLoading, isFetchingMore, hasLoadedOnce, hasMore, loadMore, error } = usePokemonList();

    // aside
    const [asideOpen, setAsideOpen] = useState(false);
    // viewmode dos botoes
    const [viewMode, setViewMode] = useState<"card" | "list">("card");
    // busca no aside
    const [search, setSearch] = useState("");
    // busca via tipo
    const [selectedType, setSelectedType] = useState<string | null>(null);
    // busca por região
    const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

    function toggleAside() {
        setAsideOpen(prev => !prev);
    };

    function closeAside() {
        setAsideOpen(false);
    }

    // quando fizer uma busca, volta pro topo da pagina
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [search, selectedType, selectedRegion]);

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

    // chamar observer (Block durante busca)
    useEffect(() => {
        const trigger = document.querySelector("#scroll-trigger");

        if (!trigger) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetchingMore && hasMore) {
                    loadMore();
                }
            },
            {
                rootMargin: "200px"
            }
        );

        observer.observe(trigger);

        return () => observer.disconnect();
    }, [isFetchingMore, hasMore, loadMore]);

    // filtrar pokemons (nome digitado, tipos/ regiões selecionados via clique)
    const selectedRegionData = regions.find(r => r.id === selectedRegion);

    const filteredPokemons = useMemo(() => {
        return pokemons
            // busca por nome (sem numero agora)
            .filter((pokemon) =>
                pokemon.name.toLowerCase().includes(search.toLowerCase())
            )
            // filtro por tipo
            .filter((pokemon) => {
                if (!selectedType) return true;

                return pokemon.types.some(
                    (t: any) => t.type.name === selectedType
                );
            })
            // filtro por região
            .filter((pokemon) => {
                if (!selectedRegionData) return true;

                return (
                    pokemon.id >= selectedRegionData.min &&
                    pokemon.id <= selectedRegionData.max
                )
            })
    }, [pokemons, search, selectedType, selectedRegionData]);


    // h2 referente a regiao selecionada no filtro
    const region = regions.find(r => r.id === selectedRegion);

    const regionH2 = region ? `${region.namePt} Dex` : "Nacional Dex";

    // mensagem exibida do momento em que esta a dex
    let content;

    // loading inicial
    if (isInitialLoading && !hasLoadedOnce) {
        content = <p className={styles.loading}>Procurando Pokémon(s)...</p>;
    }

    // nenhum encontrado (SÓ quando já terminou tudo)
    else if (
        filteredPokemons.length === 0 &&
        !hasMore &&
        hasLoadedOnce
    ) {
        content = <p className={styles.loading}>Nenhum Pokémon encontrado...</p>;
    }

    // erro
    if (error) {
        content = <p className={styles.loading}>Erro ao carregar Pokémon.</p>;
    }

    return (
        <main >
            <div className={styles.layout_pokedex}>
                <PokedexAside
                    isOpen={asideOpen}
                    closeAside={closeAside}
                    search={search}
                    setSearch={setSearch}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                />

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

                    {/* botao pra voltar ao topo */}
                    <BotaoFly />

                    {/* subtitulo */}
                    <section className={`section_main ${styles.container_pokedex}`}>
                        <h2 className="subtitulo_h2">
                            <div className="icone_wrap">
                                <IconeSeta className="h2_icone" />
                            </div>

                            <span className="texto_titulo">{regionH2}</span>
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

                        <div className={styles.filtro_escolhido}>
                            {selectedType && (
                                <div className={styles.filtro_chip}>
                                    {selectedType}
                                    <button onClick={() => setSelectedType(null)}>X</button>
                                </div>
                            )}

                            {selectedRegion && (
                                <div className={styles.filtro_chip}>
                                    {regions.find(r => r.id === selectedRegion)?.namePt}
                                    <button onClick={() => setSelectedRegion(null)}>X</button>
                                </div>
                            )}
                        </div>

                        {/* exibição card/lista */}
                        {viewMode === "card" ? (
                            <div className={styles.container_card}>
                                <div className={styles.card_dex}>
                                    {content
                                        ? content
                                        : filteredPokemons.map((pokemon) => (
                                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                                        ))}
                                </div>
                            </div>

                        ) : (

                            <div className={styles.lista_dex}>
                                {content
                                    ? content
                                    : filteredPokemons.map((pokemon) => (
                                        <PokemonLista key={pokemon.id} pokemon={pokemon} />
                                    ))}
                            </div>
                        )}

                        <div id="scroll-trigger"></div>
                    </section>
                </div>
            </div>
        </main>
    )
}