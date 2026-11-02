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

export function ArvoreEvolucao({
    evolutionTree,
    evolutionPokemonData
}: EvolutionTreeProps) {

    // Localiza os dados do Pokémon correspondente ao nó.
    function getPokemonData(node: EvolutionNode) {
        return evolutionPokemonData.find(
            (pokemon) =>
                (node.pokemonName ??
                    normalizeEvolutionPokemonName(node.name)) === pokemon.name
        );
    }

    // Renderiza o cartão individual de cada Pokémon.
    function renderPokemon(node: EvolutionNode): React.ReactNode {
        const pokemonData = getPokemonData(node);

        if (!pokemonData) return null;

        return (
            <Link
                href={`/pokemon/${node.name}`}
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
                            {formatFullPokemonName(pokemonData.name)}
                        </p>

                        <p className={styles.poke_num}>
                            #{String(pokemonData.nationalDexNumber).padStart(4, "0")}
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
        );
    }

    // Apresentação mobile: mantém a estrutura recursiva original.
    function renderNode(node: EvolutionNode): React.ReactNode {
        if (!getPokemonData(node)) return null;

        return (
            <div className={styles.branch_evolucao} key={node.id ?? node.name}>
                {renderPokemon(node)}

                {node.children.length > 0 && (
                    <div className={styles.children_container}>
                        <IconeBaixo className={styles.icone_evo} />

                        <div className={styles.children_list}>
                            {node.children.map((child, index) => (
                                <React.Fragment
                                    key={child.id ?? `${child.name}-${child.pokemonName ?? "base"}-${index}`}
                                >
                                    {renderNode(child)}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }


    // Identifica formas regionais que correspondem à própria espécie inicial.
    function isRegionalVariantOfRoot(
        node: EvolutionNode,
        root: EvolutionNode
    ): boolean {
        if (!node.region) return false;

        const rootName = normalizeEvolutionPokemonName(
            root.pokemonName ?? root.name
        );

        const regionalName = normalizeEvolutionPokemonName(
            node.pokemonName ?? node.name
        ).replace(/-(alola|galar|hisui|paldea)$/, "");

        return regionalName === rootName;
    }

    // Prepara as linhas independentes para a apresentação desktop.
    const regionalRoots = evolutionTree.children.filter((child) =>
        isRegionalVariantOfRoot(child, evolutionTree)
    );

    const desktopEvolutionRoots = [
        {
            ...evolutionTree,
            children: evolutionTree.children.filter(
                (child) => !regionalRoots.includes(child)
            ),
        },
        ...regionalRoots,
    ];

    return (
        <>
            {evolutionTree.children.length === 0 ? (
                <div className={styles.poke_sem_evo}>
                    Pokémon sem Evoluções ou Pré-evoluções.
                </div>
            ) : (
                <>
                    {/* Apresentação mobile */}
                    <div className={styles.evolucao_mobile}>
                        {renderNode(evolutionTree)}
                    </div>

                    {/* Apresentação desktop */}
                    <div className={styles.evolucao_desktop}>
                        {desktopEvolutionRoots.map((root, index) => (
                            <React.Fragment
                                key={root.id ?? `${root.name}-${index}`}
                            >
                                {renderNode(root)}
                            </React.Fragment>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}