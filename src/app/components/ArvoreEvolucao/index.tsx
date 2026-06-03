import Link from "next/link";
import Image from "next/image";
import React from "react";

import styles from "@/app/pokemon/[name]/page.module.css";
import { IconeBaixo } from "../icons/Icons";
import { formatFullPokemonName } from "@/app/utils/formatFullPokemonNames";

import { EvolutionNode, EvolutionPokemon } from "@/types/pokemon";
import { normalizeEvolutionPokemonName } from "@/app/utils/normalizeEvolutionPokemonName";

interface EvolutionTreeProps {
    evolutionTree: EvolutionNode;

    evolutionPokemonData: EvolutionPokemon[];
};

export function ArvoreEvolucao({ evolutionTree, evolutionPokemonData }: EvolutionTreeProps) {

    // função pra separar pokemons com mais de 1 evolução como slowpoke ou eevee e configurar visualmente melhor
    function renderNode(
        node: EvolutionNode
    ): React.ReactNode {

        const pokemonData = evolutionPokemonData.find((pokemon) =>
            normalizeEvolutionPokemonName(node.name) === pokemon.name
        );

        if (!pokemonData) return null;

        return (
            <div className={styles.branch_evolucao}>

                <Link
                    href={`/pokemon/${pokemonData.name}`}
                    className={styles.link_evolucao}
                >
                    <div className={styles.divisoria_evo}>

                        <div className={styles.borda_evo}>
                            <Image
                                src={
                                    pokemonData.sprites.other[
                                        "official-artwork"
                                    ].front_default
                                }
                                width={200}
                                height={200}
                                alt={pokemonData.name}
                                className={styles.evo_pokemon}
                            />
                        </div>

                        <div>
                            <p className={styles.poke_nome}>
                                {formatFullPokemonName(
                                    pokemonData.name
                                )}
                            </p>

                            <p className={styles.poke_num}>
                                #{pokemonData.id}
                            </p>
                        </div>

                        <div className={styles.tipo_evo}>
                            {pokemonData.types.map((type) => (
                                <span
                                    key={type.type.name}
                                    className={styles.tipo_pokemon}
                                    data-type={type.type.name}
                                >
                                    {type.type.name}
                                </span>
                            ))}
                        </div>

                    </div>
                </Link>

                {node.children.length > 0 && (
                    <div className={styles.children_container}>

                        <IconeBaixo
                            className={styles.icone_evo}
                        />

                        <div className={styles.children_list}>
                            {node.children.map((child) => (
                                <React.Fragment key={child.name}>
                                    {renderNode(child)}
                                </React.Fragment>
                            ))}
                        </div>

                    </div>
                )}

            </div>
        );
    }

    return renderNode(evolutionTree);
};