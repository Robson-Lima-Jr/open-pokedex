"use client";
import styles from "./PokedexAside.module.css";
import pokemonTypes from "@/app/data/pokemonTypes";
import regions from "@/app/data/regions";
import { useState } from "react";
import { IconePokeball, IconeSeta } from "../icons/Icons";

// props para colocar a config de abrir e fechar do filtro
type Props = {
    isOpen: boolean;
    closeAside: () => void;
    search: string;
    setSearch: (value: string) => void;
    selectedType: string | null;
    setSelectedType: (value: string | null) => void;
    selectedRegion: number | null;
    setSelectedRegion: (value: number | null) => void;
};

export default function PokedexAside({ isOpen, closeAside, search, setSearch, selectedType, setSelectedType, selectedRegion, setSelectedRegion }: Props) {
    // configurar botôes - abrir lista
    const [openSection, setOpenSection] = useState({
        tipos: true,
        regioes: true
    })

    function toggleSection(section: "tipos" | "regioes") {
        setOpenSection(prev => ({
            ...prev, [section]: !prev[section]
        }));
    };

    return (
        <aside className={`${styles.container_aside} ${isOpen ? styles.aside_aberto : ""}`}>
            <button className={styles.fechar_aside}
                aria-label="Fechar filtros"
                onClick={closeAside}>
                X
            </button>

            <h2 className={styles.h2_aside}><IconePokeball className={styles.icone_h2} /> Filtros</h2>

            {/* Busca por texto */}
            <div className={styles.aside_bloco}>
                <label htmlFor="busca" className={styles.label_busca}>
                    Buscar Pokémon
                </label>

                <input type="text"
                    id="busca"
                    placeholder="Nome ou número"
                    className={styles.input_busca}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* tipos */}
            <div className={styles.aside_bloco}>
                <button className={` ${styles.aside_botao} ${openSection.tipos ? styles.botao_ativado : ""}`} onClick={() => toggleSection("tipos")}>
                    <IconePokeball className={styles.icone_area} /> Tipos
                </button>

                <ul className={`${styles.aside_ul} ${openSection.tipos ? styles.lista_aberta : ""}`}>
                    <li className={`${styles.aside_li} ${selectedType === null ? styles.selecionado : ""}`}
                        onClick={() => setSelectedType(null)}
                    >
                        <IconeSeta className={styles.seta_icone} />Todos
                    </li>

                    {pokemonTypes.map((type) => (
                        <li key={type.id}
                            className={`${styles.aside_li} ${selectedType === type.nameEn ? styles.selecionado : ""
                                }`}
                            onClick={() => setSelectedType(type.nameEn)}
                        >
                            <IconeSeta className={styles.seta_icone} /> {type.nameEn} ({type.namePt})
                        </li>
                    ))}
                </ul>
            </div>

            {/* Região */}
            <div className={styles.aside_bloco}>
                <button className={` ${styles.aside_botao} ${openSection.regioes ? styles.botao_ativado : ""}`} onClick={() => toggleSection("regioes")}>
                    <IconePokeball className={styles.icone_area} /> Regiões
                </button>

                <ul className={`${styles.aside_ul} ${openSection.regioes ? styles.lista_aberta : ""}`}>
                    <li className={`${styles.aside_li} ${selectedRegion === null ? styles.selecionado : ""}`}
                        onClick={() => setSelectedRegion(null)}
                        >
                       <IconeSeta className={styles.seta_icone} />Todas
                    </li>

                    {regions.map((region) => (
                        <li key={region.id} className={`${styles.aside_li} ${selectedRegion === region.id ? styles.selecionado: ""}`}
                            onClick={() => setSelectedRegion(region.id)}
                        >
                            <IconeSeta className={styles.seta_icone} /> {region.namePt}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}