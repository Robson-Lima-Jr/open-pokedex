import styles from "./page.module.css";
import Link from "next/link";

// types
import { PokemonData, PokemonSpecies, TypeData, EvolutionPokemon, EvolutionChain, EvolutionLink, EvolutionNode, AbilityData } from "@/types/pokemon";
import type { PokemonForm } from "@/types/forms";

// data
import { defaultFormBySpecies } from "@/app/data/defaultFomBySpecies";

// utils
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

    const speciesName =
        keepName.includes(lowerName) ||
            paradoxList.includes(lowerName)
            ? lowerName
            : lowerName.split("-")[0];

    // Primeiro, busca a espécie.
    const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${speciesName}`
    );

    if (!speciesResponse.ok) {
        throw new Error("Espécie não encontrada");
    }

    const species: PokemonSpecies = await speciesResponse.json();

    // Descobre a forma padrão.
    const defaultVariety = species.varieties.find(
        (variety) => variety.is_default
    )?.pokemon.name;

    // Define qual Pokémon será carregado.
    const pokemonApiName =
        defaultFormBySpecies[lowerName] ||
        defaultVariety ||
        lowerName;

    // Busca os dados do Pokémon.
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonApiName}`
    );

    if (!response.ok) {
        throw new Error("Pokémon não encontrado");
    }

    const pokemon: PokemonData = await response.json();

    // chamada de formas pokemon

    // Descoberta de formas pela PokéAPI
    // Descoberta automática de formas pela PokéAPI

    const apiVarieties = species.varieties.map((variety) => ({
        apiName: variety.pokemon.name,
    }));

    // Garante que o Pokémon carregado pela página esteja na lista.
    const allVarieties = apiVarieties.some(
        (variety) => variety.apiName === pokemon.name
    )
        ? apiVarieties
        : [
            { apiName: pokemon.name },
            ...apiVarieties,
        ];

    // Evita entradas duplicadas.
    const uniqueVarieties = Array.from(
        new Map(
            allVarieties.map((variety) => [
                variety.apiName,
                variety,
            ])
        ).values()
    );

    // Descobre o slug, o rótulo e a categoria de cada forma.
    const discoveredForms: PokemonForm[] = uniqueVarieties.map(
        ({ apiName }) => {
            const slug =
                apiName === speciesName
                    ? "base"
                    : apiName.startsWith(`${speciesName}-`)
                        ? apiName.slice(speciesName.length + 1)
                        : apiName === pokemon.name && apiName.includes("-")
                            ? apiName.split("-").slice(1).join("-")
                            : apiName;

            const isDefault = apiName === pokemon.name;

            let category: PokemonForm["category"] = isDefault
                ? "base"
                : "form";

            if (!isDefault) {
                if (slug.includes("mega-z")) {
                    category = "mega-z";
                } else if (slug.includes("mega-x")) {
                    category = "mega-x";
                } else if (slug.includes("mega-y")) {
                    category = "mega-y";
                } else if (slug.startsWith("mega")) {
                    category = "mega";
                } else if (
                    slug.includes("gmax") ||
                    slug.includes("gigantamax")
                ) {
                    category = "g-max";
                } else if (
                    slug.includes("alola") ||
                    slug.includes("galar") ||
                    slug.includes("hisui") ||
                    slug.includes("paldea")
                ) {
                    category = "regional";
                }
            }

            const formatLabel = (value: string) => {
                const specialLabels: Record<string, string> = {
                    altered: "Altered",
                    origin: "Origin",
                    normal: "Normal",
                    attack: "Attack",
                    defense: "Defense",
                    speed: "Speed",
                    "green-plumage": "Green Plumage",
                    "blue-plumage": "Blue Plumage",
                    "white-plumage": "White Plumage",
                    "yellow-plumage": "Yellow Plumage",
                    "50": "50%",
                    "10": "10%",
                    complete: "Complete",
                };

                if (specialLabels[value]) {
                    return specialLabels[value];
                }

                return value
                    .split("-")
                    .map((part) =>
                        part.charAt(0).toUpperCase() + part.slice(1)
                    )
                    .join(" ");
            };

            const shortLabel =
                slug === "base"
                    ? "Base"
                    : slug === "gmax" || slug === "gigantamax"
                        ? "Gigantamax"
                        : formatLabel(slug);

            return {
                slug,
                shortLabel,
                fullLabel: apiName,
                category,
                isDefault,
            };
        }
    );

    // A forma carregada pela página aparece primeiro.
    const forms = discoveredForms.sort(
        (a, b) => Number(b.isDefault) - Number(a.isDefault)
    );

    // Relaciona cada slug ao nome exato do endpoint da PokéAPI.
    const formApiNameBySlug = Object.fromEntries(
        uniqueVarieties.map(({ apiName }) => {
            const slug =
                apiName === speciesName
                    ? "base"
                    : apiName.startsWith(`${speciesName}-`)
                        ? apiName.slice(speciesName.length + 1)
                        : apiName === pokemon.name && apiName.includes("-")
                            ? apiName.split("-").slice(1).join("-")
                            : apiName;

            return [slug, apiName];
        })
    ) as Record<string, string>;

    // Carrega os dados de cada forma.
    const formsData = await Promise.all(
        forms.map(async (form) => {
            if (form.isDefault) {
                return {
                    slug: form.slug,
                    data: pokemon,
                };
            }

            const apiName = formApiNameBySlug[form.slug];

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${apiName}`
            );

            if (!response.ok) {
                throw new Error(
                    `Não foi possível carregar a forma: ${apiName}`
                );
            }

            return {
                slug: form.slug,
                data: await response.json() as PokemonData,
            };
        })
    );

    const formsDataMap = Object.fromEntries(
        formsData.map(({ slug, data }) => [slug, data])
    );

    // Exibe o seletor somente quando existe mais de uma forma.
    const hasAlternateForms = forms.length > 1;

    const formsDataForView = hasAlternateForms
        ? {
            pokemonName: speciesName,
            forms,
        }
        : undefined;


    // referente aos tipos pokemon
    // Dados dos tipos de cada forma
    const typeDataMap: Record<string, TypeData[]> = {};

    // Tipos do Pokémon base
    const defaultTypeResponses = await Promise.all(
        pokemon.types.map((type) =>
            fetch(
                `https://pokeapi.co/api/v2/type/${type.type.name}`
            )
        )
    );

    typeDataMap.default = await Promise.all(
        defaultTypeResponses.map(async (response) => {
            if (!response.ok) {
                throw new Error("Não foi possível carregar os tipos");
            }

            return response.json() as Promise<TypeData>;
        })
    );

    // Tipos de todas as formas carregadas
    await Promise.all(
        Object.entries(formsDataMap).map(
            async ([formSlug, formPokemon]) => {
                const typeResponses = await Promise.all(
                    formPokemon.types.map((type) =>
                        fetch(
                            `https://pokeapi.co/api/v2/type/${type.type.name}`
                        )
                    )
                );

                typeDataMap[formSlug] = await Promise.all(
                    typeResponses.map(async (response) => {
                        if (!response.ok) {
                            throw new Error(
                                `Não foi possível carregar os tipos da forma ${formSlug}`
                            );
                        }

                        return response.json() as Promise<TypeData>;
                    })
                );
            }
        )
    );


    // referente a habilidades
    // Dados das habilidades de cada forma
    const abilityDataMap: Record<string, AbilityData[]> = {};

    // Habilidades do Pokémon base
    const defaultAbilityResponses = await Promise.all(
        pokemon.abilities.map((ability) =>
            fetch(ability.ability.url)
        )
    );

    abilityDataMap.default = await Promise.all(
        defaultAbilityResponses.map(async (response) => {
            if (!response.ok) {
                throw new Error(
                    "Não foi possível carregar as habilidades"
                );
            }

            return response.json() as Promise<AbilityData>;
        })
    );

    // Habilidades de todas as formas carregadas
    await Promise.all(
        Object.entries(formsDataMap).map(
            async ([formSlug, formPokemon]) => {
                const abilityResponses = await Promise.all(
                    formPokemon.abilities.map((ability) =>
                        fetch(ability.ability.url)
                    )
                );

                abilityDataMap[formSlug] = await Promise.all(
                    abilityResponses.map(async (response) => {
                        if (!response.ok) {
                            throw new Error(
                                `Não foi possível carregar as habilidades da forma ${formSlug}`
                            );
                        }

                        return response.json() as Promise<AbilityData>;
                    })
                );
            }
        )
    );

    // chamada evolução
    const evolutionResponse = await fetch(species.evolution_chain.url);

    const evolutionData: EvolutionChain = await evolutionResponse.json();

    // funçao evolução
    const evolutionNames = new Set<string>();

    const getEvolutionChain = (chain: EvolutionLink) => {
        evolutionNames.add(chain.species.name);

        chain.evolution_details.forEach((detail) => {
            if (detail.required_pokemon_form) {
                evolutionNames.add(detail.required_pokemon_form.name);
            }

            if (detail.evolved_pokemon_form) {
                evolutionNames.add(detail.evolved_pokemon_form.name);
            }
        });

        chain.evolves_to.forEach((evolution) => {
            getEvolutionChain(evolution);
        });
    };

    getEvolutionChain(evolutionData.chain);


    // arvore de evolução pra pokemons como eevee ou slowpoke que tem mais de 1 evo
    function buildEvolutionTree(chain: EvolutionLink): EvolutionNode {
        function buildNode(
            current: EvolutionLink,
            pokemonName?: string,
            region?: string,
            id?: string,
            isRoot = false
        ): EvolutionNode {
            const currentForm =
                pokemonName ??
                normalizeEvolutionPokemonName(current.species.name);

            const node: EvolutionNode = {
                id: id ?? current.species.name,
                name: current.species.name,
                pokemonName: currentForm,
                region,
                children: []
            };

            for (const child of current.evolves_to) {
                const details = child.evolution_details;

                const hasBasePath = details.some((detail) => {
                    const sourceForm = detail.required_pokemon_form?.name;
                    const targetForm = detail.evolved_pokemon_form?.name;

                    return (
                        (!sourceForm && !targetForm) ||
                        (sourceForm === currentForm && !targetForm)
                    );
                });

                const hasFormDetails = details.some(
                    (detail) =>
                        detail.required_pokemon_form ||
                        detail.evolved_pokemon_form
                );

                // Evolução tradicional: adicionada uma única vez.
                const isRegionalBranch =
                    currentForm !== current.species.name;

                if (
                    (hasBasePath || !hasFormDetails) &&
                    !isRegionalBranch
                ) {
                    node.children.push(buildNode(child));
                }

                // Agrupa os destinos por forma de origem.
                const sourceGroups = new Map<
                    string,
                    typeof details
                >();

                for (const detail of details) {
                    const sourceForm = detail.required_pokemon_form?.name;

                    if (!sourceForm) continue;

                    const group = sourceGroups.get(sourceForm) ?? [];
                    group.push(detail);
                    sourceGroups.set(sourceForm, group);
                }

                for (const [sourceForm, group] of sourceGroups) {
                    const sourceMatchesCurrent = sourceForm === currentForm;

                    if (sourceMatchesCurrent) {
                        // A origem já é o Pokémon exibido.
                        // Só precisamos acrescentar destinos alternativos.
                        for (const detail of group) {
                            const targetForm =
                                detail.evolved_pokemon_form?.name;

                            if (!targetForm) continue;

                            const alreadyExists = node.children.some(
                                (existing) =>
                                    existing.pokemonName === targetForm
                            );

                            if (alreadyExists) continue;

                            const targetRegion =
                                detail.region?.name ??
                                targetForm.split("-").at(-1);

                            node.children.push(
                                buildNode(
                                    child,
                                    targetForm,
                                    targetRegion,
                                    `${sourceForm}-${targetForm}`
                                )
                            );
                        }

                        continue;
                    }

                    // Uma forma de origem diferente só abre um novo ramo
                    // na raiz. Nos demais níveis, o ramo regional já deve
                    // ter sido criado pela forma de destino do nível anterior.
                    if (!isRoot) continue;

                    const sourceRegion =
                        group.find((detail) => detail.region)?.region?.name ??
                        sourceForm.split("-").at(-1);

                    const sourceNode: EvolutionNode = {
                        id: sourceForm,
                        name: sourceForm,
                        pokemonName: sourceForm,
                        region: sourceRegion,
                        children: []
                    };

                    for (const detail of group) {
                        const targetForm =
                            detail.evolved_pokemon_form?.name;

                        const targetName =
                            targetForm ??
                            normalizeEvolutionPokemonName(child.species.name);

                        const alreadyExists = sourceNode.children.some(
                            (existing) => existing.pokemonName === targetName
                        );

                        if (alreadyExists) continue;

                        const targetRegion =
                            detail.region?.name ??
                            (targetForm
                                ? targetForm.split("-").at(-1)
                                : undefined);

                        sourceNode.children.push(
                            buildNode(
                                child,
                                targetName,
                                targetRegion,
                                `${sourceForm}-${targetName}-target`
                            )
                        );
                    }

                    if (sourceNode.children.length > 0) {
                        node.children.push(sourceNode);
                    }
                }

                // Destinos alternativos sem forma de origem especificada.
                for (const detail of details) {
                    if (detail.required_pokemon_form) continue;

                    const targetForm =
                        detail.evolved_pokemon_form?.name;

                    if (!targetForm) continue;

                    const alreadyExists = node.children.some(
                        (existing) => existing.pokemonName === targetForm
                    );

                    if (alreadyExists) continue;

                    const targetRegion =
                        detail.region?.name ?? targetForm.split("-").at(-1);

                    node.children.push(
                        buildNode(
                            child,
                            targetForm,
                            targetRegion,
                            `${child.species.name}-${targetForm}`
                        )
                    );
                }
            }

            return node;
        }

        return buildNode(chain, undefined, undefined, undefined, true);
    }

    const evolutionTree = buildEvolutionTree(evolutionData.chain);

    const evolutionPokemonData: EvolutionPokemon[] = (
        await Promise.all(
            Array.from(evolutionNames).map(async (pokemonName) => {
                const apiName = normalizeEvolutionPokemonName(pokemonName);

                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${apiName}`
                );

                if (!response.ok) {
                    console.warn(
                        `Não foi possível buscar os dados da evolução: ${apiName}`
                    );

                    return null;
                }

                const pokemonData = await response.json();

                // Busca a espécie para obter o número nacional da Pokédex.
                const speciesResponse = await fetch(pokemonData.species.url);

                if (!speciesResponse.ok) {
                    console.warn(
                        `Não foi possível buscar a espécie: ${apiName}`
                    );

                    return null;
                }

                const speciesData = await speciesResponse.json();

                return {
                    ...pokemonData,
                    nationalDexNumber: speciesData.id,
                };
            })
        )
    ).filter(Boolean) as EvolutionPokemon[];

    // console.log(
    //     "Dados da cadeia evolutiva:",
    //     JSON.stringify(evolutionData.chain, null, 2)
    // );

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
                    formsData={formsDataForView}
                    formsDataMap={formsDataMap}
                    typeDataMap={typeDataMap}
                    gender={gender}
                    genus={genus}
                    flavorText={cleanFlavorText}
                    abilityDataMap={abilityDataMap}
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