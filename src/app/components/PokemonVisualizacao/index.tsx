"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@/app/pokemon/[name]/page.module.css"

// types
import { PokemonFormsData } from "@/types/forms";
import { PokemonData } from "@/types/pokemon";

// componentes
import { PokemonMudarFormas } from "../PokemonMudarFormas";
import { StatsGroup } from "../Stats/StatsGroup";

// data
import { TypeData } from "@/types/pokemon";

interface PokemonVisualizacaoProps {
    pokemon: PokemonData;
    formsData?: PokemonFormsData;
    formsDataMap: Record<string, PokemonData>;

    typeDataMap: Record<string, TypeData[]>;

    gender: string;
    genus?: string;
    flavorText?: string;
};

const formatMultiplier = (multiplier: number) => {
    if (multiplier === 4) return "x4";

    if (multiplier === 2) return "x2";

    if (multiplier === 0.5) return "÷2";

    if (multiplier === 0.25) return "÷4";

    if (multiplier === 0) return "0";

    return `x${multiplier}`;
};

export function PokemonVisualizacao({ pokemon, formsData, formsDataMap, typeDataMap, gender, genus, flavorText }: PokemonVisualizacaoProps) {
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

    const currentTypeData = 
        selectedForm
            ? typeDataMap[selectedForm]
            : typeDataMap.default;

    // tipagem + fraqueza x resist            
    const typeMatchups: Record<string, number> = {};

    currentTypeData.forEach((type) => {
        type.damage_relations.double_damage_from.forEach((damageType) => {
            const currentValue = typeMatchups[damageType.name];

            if (currentValue !== 0) {
                typeMatchups[damageType.name] = (currentValue || 1) * 2;
            }
        });

        type.damage_relations.half_damage_from.forEach((damageType) => {
            const currentValue = typeMatchups[damageType.name];

            if (currentValue !== 0) {
                typeMatchups[damageType.name] = (currentValue || 1) * 0.5;
            }
        });

        type.damage_relations.no_damage_from.forEach((damageType) => {
            typeMatchups[damageType.name] = 0;
        });
    });

    const matchups = Object.entries(typeMatchups).filter(([, value]) => value !== 1);

    const weakness = matchups
        .filter(([_, multiplier]) => multiplier > 1)
        .sort((a, b) => b[1] - a[1]);

    const resistances = matchups
        .filter(([_, multiplier]) => multiplier < 1)
        .sort((a, b) => a[1] - b[1]);

    //peso/altura 
    const height = currentFormData.height / 10;

    const weight = currentFormData.weight / 10;

    // abilidades
    const abilities = currentFormData.abilities.map((ability) => ({
        name: ability.ability.name,
        hidden: ability.is_hidden,
    }));

    // stats
    const stats = {
        hp: currentFormData.stats.find(
            (stat) => stat.stat.name === "hp"
        )?.base_stat || 0,

        atk: currentFormData.stats.find(
            (stat) => stat.stat.name === "attack"
        )?.base_stat || 0,

        def: currentFormData.stats.find(
            (stat) => stat.stat.name === "defense"
        )?.base_stat || 0,

        spa: currentFormData.stats.find(
            (stat) => stat.stat.name === "special-attack"
        )?.base_stat || 0,

        spd: currentFormData.stats.find(
            (stat) => stat.stat.name === "special-defense"
        )?.base_stat || 0,

        spe: currentFormData.stats.find(
            (stat) => stat.stat.name === "speed"
        )?.base_stat || 0
    };

    return (
        <>
            <section className={styles.header_pokemon}>
                <div className={styles.formas_area}>
                    {formsData && (
                        <PokemonMudarFormas
                            forms={formsData.forms}
                            selectedForm={selectedForm}
                            setSelectedForm={setSelectedForm}
                        />
                    )}
                </div>
            </section>

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
                        
                        <p className={styles.item_dados}>Gênero: <span className={styles.valores_dados}>{gender}</span></p>

                        <p className={styles.item_dados}>Categoria: <span className={styles.valores_dados}>{genus}</span></p>

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

                    <div className={`${styles.fundo_dados} ${styles.descricao_dados}`}>
                        <p className={styles.item_dados}>Descrição: <span className={styles.valores_dados}>{flavorText}</span></p>
                    </div>
                </div>
            </section>

            {/* tipagem */}
            <div className={`${styles.section_pokemon} ${styles.section_tipos}`}>
                <h2 className={styles.h2_descricao}>Tipo</h2>

                <div className={styles.container_tipos}>
                    {currentFormData.types.map((type) => (
                        <span
                            key={type.type.name}
                            className={styles.tipo_pokemon}
                            data-type={type.type.name}
                        >
                            {type.type.name}
                        </span>
                    ))}
                </div>

                <h2 className={styles.h2_descricao}>Fraquezas</h2>

                <div className={styles.container_tipos}>
                    {weakness.map(([typeName, multiplier]) => (
                        <div
                            key={typeName}
                            className={styles.item_tipos}
                        >
                            <span
                                className={styles.tipo_pokemon}
                                data-type={typeName}
                            >
                                {typeName}
                            </span>

                            <span className={styles.icone_fraqueza} data-multiplier={multiplier}>
                                {formatMultiplier(multiplier)}
                            </span>
                        </div>
                    ))}
                </div>

                <h2 className={styles.h2_descricao}>Resistências</h2>

                <div className={styles.container_tipos}>
                    {resistances.map(([typeName, multiplier]) => (
                        <div
                            key={typeName}
                            className={styles.item_tipos}
                        >
                            <span
                                className={styles.tipo_pokemon}
                                data-type={typeName}
                            >
                                {typeName}
                            </span>

                            <span className={styles.icone_resistencia} data-multiplier={multiplier}>
                                {formatMultiplier(multiplier)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* stats */}
            <section className={`${styles.section_pokemon} ${styles.section_stats}`}>
                <h2 className={styles.h2_descricao}>Stats</h2>


                <StatsGroup stats={stats} />
            </section>
        </>
    );
}