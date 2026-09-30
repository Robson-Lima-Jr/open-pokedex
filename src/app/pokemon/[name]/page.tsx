import styles from "./page.module.css";
import Link from "next/link";

// types
import { PokemonData, PokemonSpecies, TypeData, EvolutionPokemon, EvolutionChain, EvolutionLink, EvolutionNode } from "@/types/pokemon";

// data
import { defaultFormBySpecies } from "@/app/data/defaultFomBySpecies";
import { pokemonForms } from "@/app/data/pokemonForms";

// utils
import { getFormPokemonApiName } from "@/app/utils/getFormPokemonApiName";
import { normalizeEvolutionPokemonName } from "@/app/utils/normalizeEvolutionPokemonName";
import { formatFullPokemonName, keepName, paradoxList } from "@/app/utils/formatFullPokemonNames";

// componentes
import { IconeSeta, IconeLink } from "../../components/icons/Icons";
import { ArvoreEvolucao } from "@/app/components/ArvoreEvolucao";
import { PokemonVisualizacao } from "@/app/components/PokemonVisualizacao";

export default async function PokemonPage({
    params,
}: {
    params: Promise<{ name: string }>;
}) {

    const { name } = await params;

    const lowerName = name.toLowerCase();

    const pokemonApiName = defaultFormBySpecies[lowerName] || lowerName;

    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonApiName}`
    );

    if (!response.ok) {
        throw new Error("Pokémon não encontrado");
    }

    const pokemon: PokemonData = await response.json();

    const speciesName =
        keepName.includes(lowerName) ||
            paradoxList.includes(lowerName)
            ? lowerName
            : lowerName.split("-")[0];

    // busca em species
    const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${speciesName}`
    );

    if (!speciesResponse.ok) {
        throw new Error("Especie não Encontrada");
    }

    const species: PokemonSpecies = await speciesResponse.json();

    // chamada de formas pokemon
    const currentPokemonForms = pokemonForms[speciesName];

    const formsApiNames = currentPokemonForms?.forms.map((form) =>
        getFormPokemonApiName(
            currentPokemonForms.pokemonName,
            form
        )
    );

    const formsData: PokemonData[] = formsApiNames
        ? await Promise.all(
            formsApiNames.map(async (formName) => {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${formName}`
                );

                return response.json();
            })
        )
        : [];

    const formsDataMap = currentPokemonForms
        ? Object.fromEntries(
            currentPokemonForms.forms.map((form, index) => [
                form.slug,
                formsData[index]
            ])
        )
        : {};

    const typeDataMap: Record<string, TypeData[]> = {};

    if (currentPokemonForms) {
        await Promise.all(
            currentPokemonForms.forms.map(async (form, index) => {
                const formPokemon = formsData[index];

                const typeResponses = await Promise.all(
                    formPokemon.types.map((type) =>
                        fetch(
                            `https://pokeapi.co/api/v2/type/${type.type.name}`
                        )
                    )
                );

                const typeData: TypeData[] = await Promise.all(
                    typeResponses.map((response) => response.json())
                );

                typeDataMap[form.slug] = typeData;
            })
        );
    } else {
        const typeResponses = await Promise.all(
            pokemon.types.map((type) =>
                fetch(
                    `https://pokeapi.co/api/v2/type/${type.type.name}`
                )
            )
        );

        typeDataMap.default = await Promise.all(
            typeResponses.map((response) => response.json())
        );
    }


    // chamada evolução
    const evolutionResponse = await fetch(species.evolution_chain.url);

    const evolutionData: EvolutionChain = await evolutionResponse.json();

    // funçao evolução
    const evolutionNames: string[] = [];

    const getEvolutionChain = (chain: EvolutionLink) => {
        evolutionNames.push(chain.species.name);

        chain.evolves_to.forEach((evolution) => {
            getEvolutionChain(evolution);
        });
    };

    getEvolutionChain(evolutionData.chain);

    // arvore de evolução pra pokemons como eevee ou slowpoke que tem mais de 1 evo
    function buildEvolutionTree(chain: any): EvolutionNode {
        return {
            name: chain.species.name,
            children: chain.evolves_to.map(buildEvolutionTree)
        };
    };

    const evolutionTree = buildEvolutionTree(evolutionData.chain);

    const evolutionPokemonData: EvolutionPokemon[] = (
        await Promise.all(
            evolutionNames.map(async (pokemonName) => {
                const apiName = normalizeEvolutionPokemonName(pokemonName);

                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${apiName}`
                );

                if (!response.ok) {
                    console.log(
                        `Erro ao buscar evolução: ${pokemonName}`
                    );

                    return null;
                }

                return response.json();
            })
        )
    ).filter(Boolean) as EvolutionPokemon[];

    // conversao para portugues, mas não funciona entao ficou em ingles mesmo
    const flavorText =
        species.flavor_text_entries.find(
            (entry) => entry.language.name === "pt-BR"
        ) ||
        species.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
        );

    // remove espaços e /n ou /f
    const cleanFlavorText = flavorText?.flavor_text
        .replace(/\f/g, " ")
        .replace(/\n/g, " ");

    const genus =
        species.genera.find((entry) => entry.language.name === "pt-BR")?.genus ??
        species.genera.find((entry) => entry.language.name === "en")?.genus;

    // genero dos pokemons
    let gender = "";

    if (species.gender_rate === -1) {
        gender = "Unknown";
    } else if (species.gender_rate === 0) {
        gender = "Male";
    } else if (species.gender_rate === 8) {
        gender = "Female";
    } else {
        gender = "Male / Female";
    }

    // conversão de ids pros links, para chamarmos pelo nome
    let previousPokemon = null;
    let nextPokemon = null;

    const previousResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id - 1}`);

    if (previousResponse.ok) {
        previousPokemon = await previousResponse.json();
    }

    const nextResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id + 1}`);

    if (nextResponse.ok) {
        nextPokemon = await nextResponse.json();
    }

    return (
        <div className={styles.center}>
            <main className={styles.container_pokemon}>

                {/* cabeçalho pokémon */}
                <section className={styles.header_pokemon}>
                    <div className={styles.nav_pokemon}>
                        {previousPokemon ? (
                            <Link href={`/pokemon/${previousPokemon.name}`} className={styles.link_pokemon}>
                                <IconeLink className={styles.link_icon} />
                                <span>#{pokemon.id - 1} {formatFullPokemonName(previousPokemon.name)}</span>
                            </Link>
                        ) : (
                            <div></div>
                        )}

                        {nextPokemon && (
                            <Link href={`/pokemon/${nextPokemon.name}`} className={styles.link_pokemon}>
                                <span>#{pokemon.id + 1} {formatFullPokemonName(nextPokemon.name)}</span>
                                <IconeSeta className={styles.link_icon} />
                            </Link>
                        )}
                    </div>

                    <h1 className={styles.h1_pokemon}>{formatFullPokemonName(pokemon.name)}</h1>
                </section>

                <PokemonVisualizacao
                    pokemon={pokemon}
                    formsData={currentPokemonForms}
                    formsDataMap={formsDataMap}
                    typeDataMap={typeDataMap}
                    gender={gender}
                    genus={genus}
                    flavorText={cleanFlavorText}
                />

                {/* linha evolutiva */}
                <section className={`${styles.section_pokemon} ${styles.section_evolucao}`}>
                    <h2 className={styles.h2_descricao}>Linha Evolutiva</h2>

                    <div className={styles.container_evolucao}>
                        <ArvoreEvolucao
                            evolutionTree={evolutionTree}
                            evolutionPokemonData={evolutionPokemonData}
                        />
                    </div>

                    <p className={styles.obs}><strong>Observação:</strong> Os dados da API pokédex vem com suporte completo em inglês. Como português não esta completo e pra evitar inconsistência na dex, mantive os dados em inglês.</p>
                </section>
            </main>
        </div>
    )
}