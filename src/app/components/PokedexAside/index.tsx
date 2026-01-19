"use client";
import styles from "./PokedexAside.module.css";
import pokemonTypes from "@/app/data/pokemonTypes";
import regions from "@/app/data/regions";
import { useState } from "react";

// props para colocar a config de abrir e fechar do filtro
type Props = {
    isOpen: boolean;
    closeAside: () => void;
};

export default function PokedexAside({ isOpen, closeAside }: Props) {
    // configurar botôes - abrir lista
    type AsideSection = "tipos" | "regioes" | null;

    const [openSection, setOpenSection] = useState<AsideSection>(null);

    function toggleSection(section: AsideSection) {
        setOpenSection(prev => prev === section ? null : section);
    };

    return (
        <aside className={`${styles.container_aside} ${isOpen ? styles.aside_aberto : ""}`}>
            <h2 className={styles.h2_aside}><span>◓</span> Filtros</h2>

            {/* Busca por texto */}
            <div className={styles.aside_bloco}>
                <label htmlFor="busca" className={styles.label_busca}>
                    Buscar Pokémon
                </label>

                <input type="text"
                    id="busca"
                    placeholder="Nome ou número"
                    className={styles.input_busca}
                />
            </div>

            {/* tipos */}
            <div className={styles.aside_bloco}>
                <button className={` ${styles.aside_botao} ${openSection === "tipos" ? styles.botao_ativado : ""}`} onClick={() => toggleSection("tipos")}>
                    ▶ Tipos
                </button>

                <ul className={`${styles.aside_ul} ${openSection === "tipos" ? styles.lista_aberta : ""}`}>
                    {pokemonTypes.map((type) => (
                        <li key={type.id} className={styles.aside_li}>
                            <span>◓</span> {type.namePt} ({type.nameEn})
                        </li>
                    ))}
                </ul>
            </div>

            {/* Região */}
            <div className={styles.aside_bloco}>
                <button className={` ${styles.aside_botao} ${openSection === "regioes" ? styles.botao_ativado : ""}`} onClick={() => toggleSection("regioes")}>
                    ▶ Regiões
                </button>

                <ul className={`${styles.aside_ul} ${openSection === "regioes" ? styles.lista_aberta : ""}`}>
                    {regions.map((region) => (
                        <li key={region.id} className={styles.aside_li}>
                            <span>◓</span> {region.namePt}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}