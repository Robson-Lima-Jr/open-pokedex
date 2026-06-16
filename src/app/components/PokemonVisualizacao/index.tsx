"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@/app/pokemon/[name]/page.module.css"

// types
import { PokemonFormsData } from "@/types/forms";
import { PokemonData } from "@/types/pokemon";

// componentes
import { PokemonMudarFormas } from "../PokemonMudarFormas";

interface PokemonVisualizacaoProps {
    pokemon: PokemonData;
    formsData?: PokemonFormsData;
    formsDataMap: Record<string, PokemonData>;
};

export function PokemonVisualizacao({ pokemon, formsData, formsDataMap, }: PokemonVisualizacaoProps) {
    const defaultForm = formsData?.forms.find(
        (form) => form.isDefault
    );

    const [selectedForm, setSelectedForm] = useState(
        defaultForm?.slug
    );

    const currentFormData =
        selectedForm
            ? formsDataMap[selectedForm]
            : pokemon;

    const height = currentFormData.height / 10;

    const weight = currentFormData.weight / 10;

    const abilities = currentFormData.abilities.map((ability) => ({
        name: ability.ability.name,
        hidden: ability.is_hidden,
    }));

    return (
        <>
            <div className={styles.formas_area}>
                {formsData && (
                    <PokemonMudarFormas
                        forms={formsData.forms}
                        selectedForm={selectedForm}
                        setSelectedForm={setSelectedForm}
                    />
                )}
            </div>

            {/* imagem do pokemon */}
            <section className={styles.imagem_area}>
                <Image src={currentFormData.sprites.other["official-artwork"].front_default} width={400} height={400} alt="Pokémon" className={styles.imagem_pokemon}></Image>
            </section>

            {/* dados pokemon */}
            <section className={`${styles.section_pokemon} ${styles.section_dados}`}>
                <h2 className={styles.h2_descricao}>Dados na Pokédex</h2>

                <div>
                    <div className={styles.fundo_dados}>
                        <p className={styles.item_dados}>Nº Pokédex: <span className={styles.valores_dados}>{pokemon.id}</span></p>

                        <p className={styles.item_dados}>Altura: <span className={styles.valores_dados}>{height} m</span></p>

                        <p className={styles.item_dados}>Peso: <span className={styles.valores_dados}>{weight} kg</span></p>
{/* 
                        <p className={styles.item_dados}>Gênero: <span className={styles.valores_dados}>{gender}</span></p>

                        <p className={styles.item_dados}>Categoria: <span className={styles.valores_dados}>{genus?.genus}</span></p> */}

                        <p className={`${styles.item_dados} ${styles.habilidades}`}>
                            <span className={styles.item_habilidade}>Habilidades:</span>

                            <span>
                                {abilities.map((ability, index) => (
                                    <span
                                        key={ability.name}
                                        className={styles.valores_dados}
                                    >
                                        <>
                                            {index > 0}
                                            {ability.name}
                                            {ability.hidden && " (Hidden)"}
                                        </>
                                    </span>
                                ))}
                            </span>
                        </p>
                    </div>

                    {/* <div className={`${styles.fundo_dados} ${styles.descricao_dados}`}>
                        <p className={styles.item_dados}>Descrição: <span className={styles.valores_dados}>{cleanFlavorText}</span></p>
                    </div> */}
                </div>
            </section>
        </>
    );
}