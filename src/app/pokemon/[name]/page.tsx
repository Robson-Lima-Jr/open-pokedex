import styles from "./page.module.css";
import Link from "next/link";
import { IconeSeta, IconeLink, IconeBaixo } from "../../components/icons/Icons";
import { StatsGroup } from "@/app/components/Stats/StatsGroup";
import Image from "next/image";

// Interface de pokemon data 
interface PokemonData {
    id: number;
    name: string;

    height: number;
    weight: number;

    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };

    types: {
        type: {
            name: string;
        };
    }[];

    abilities: {
        ability: {
            name: string;
        };

        is_hidden: boolean;
    }[];

    stats: {
        base_stat: number;

        stat: {
            name: string;
        };
    }[];
}

// interface de species, serve pra dados como descrição e genero
interface PokemonSpecies {
    flavor_text_entries: {
        flavor_text: string;

        language: {
            name: string;
        };
    }[];

    genera: {
        genus: string;

        language: {
            name: string;
        };
    }[];

    gender_rate: number;
}

// interface para os titulos
interface TypeData {
    damage_relations: {
        double_damage_from: {
            name: string;
        }[];

        half_damage_from: {
            name: string;
        }[];

        no_damage_from: {
            name: string;
        }[];
    }
}

export default async function PokemonPage({
    params,
}: {
    params: Promise<{ name: string }>;
}) {

    const { name } = await params;

    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );

    if (!response.ok) {
        throw new Error("Pokémon não encontrado");
    }

    const pokemon: PokemonData = await response.json();

    // busca em species
    const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`
    );

    if (!speciesResponse.ok) {
        throw new Error("Especie não Encontrada");
    }

    const species: PokemonSpecies = await speciesResponse.json();

    // busca de fraquezas/ resistencias
    const typeResponses = await Promise.all(
        pokemon.types.map((type) =>
            fetch(`https://pokeapi.co/api/v2/type/${type.type.name}`)
        )
    );

    const typeData: TypeData[] = await Promise.all(typeResponses.map((response) => response.json()));

    const typeMatchups: Record<string, number> = {};

    typeData.forEach((type) => {
        type.damage_relations.double_damage_from.forEach((damageType) => {
            const currentValue = typeMatchups[damageType.name] || 1;

            typeMatchups[damageType.name] = currentValue * 2;
        });

        type.damage_relations.half_damage_from.forEach((damageType) => {
            const currentValue = typeMatchups[damageType.name] || 1;

            typeMatchups[damageType.name] = currentValue * 0.5;
        });

        type.damage_relations.no_damage_from.forEach((damageType) => {
            typeMatchups[damageType.name] = 0;
        });
    });

    const matchups = Object.entries(typeMatchups)
        .filter(([, value]) => value !== 1);

    // conversao para portugues
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
        species.genera.find(
            (genus) => genus.language.name === "pt-BR"
        ) ||
        species.genera.find(
            (genus) => genus.language.name === "en"
        );

    // genero dos pokemons
    let gender = "";

    if (species.gender_rate === -1) {
        gender = "No gender";
    } else if (species.gender_rate === 0) {
        gender = "Male only";
    } else if (species.gender_rate === 8) {
        gender = "Female only";
    } else {
        gender = "Male / Female";
    }

    const stats = {
        hp: pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat || 0,
        atk: pokemon.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0,
        def: pokemon.stats.find((stat) => stat.stat.name === "defense")?.base_stat || 0,
        spa: pokemon.stats.find((stat) => stat.stat.name === "special-attack")?.base_stat || 0,
        spd: pokemon.stats.find((stat) => stat.stat.name === "special-defense")?.base_stat || 0,
        spe: pokemon.stats.find((stat) => stat.stat.name === "speed")?.base_stat || 0
    }

    // conversor de peso/altura
    const height = pokemon.height / 10;
    const weight = pokemon.weight / 10;

    // conversor de habilidades, ser pra melhorar o render
    const abilities = pokemon.abilities.map((ability) => ({
        name: ability.ability.name,
        hidden: ability.is_hidden,
    }));

    return (
        <div className={styles.center}>
            <main className={styles.container_pokemon}>

                {/* cabeçalho pokémon */}
                <section className={styles.header_pokemon}>
                    <div className={styles.nav_pokemon}>
                        <Link href="#" className={styles.link_pokemon}>
                            <IconeLink className={styles.link_icon} />
                            <span>#{pokemon.id - 1}</span> {pokemon.name}
                        </Link>

                        <Link href="#" className={styles.link_pokemon}>
                            <span>#{pokemon.id + 1}</span> {pokemon.name}
                            <IconeSeta className={styles.link_icon} />
                        </Link>
                    </div>

                    <h1 className={styles.h1_pokemon}>{pokemon.name}</h1>
                </section>

                {/* imagem do pokemon */}
                <section className={styles.imagem_area}>
                    <Image src={pokemon.sprites.other["official-artwork"].front_default} width={400} height={400} alt="Pokémon" className={styles.imagem_pokemon}></Image>
                </section>

                {/* dados pokemon */}
                <section className={`${styles.section_pokemon} ${styles.section_dados}`}>
                    <h2 className={styles.h2_descricao}>Dados na Pokédex</h2>

                    <div>
                        <div className={styles.fundo_dados}>
                            <p className={styles.item_dados}>Nº Pokédex: <span className={styles.valores_dados}>#{pokemon.id}</span></p>

                            <p className={styles.item_dados}>Altura: <span className={styles.valores_dados}>{height} m</span></p>

                            <p className={styles.item_dados}>Peso: <span className={styles.valores_dados}>{weight} kg</span></p>

                            <p className={styles.item_dados}>Gênero: <span className={styles.valores_dados}>{gender}</span></p>

                            <p className={styles.item_dados}>Categoria: <span className={styles.valores_dados}>{genus?.genus}</span></p>

                            <p className={styles.item_dados}>
                                Habilidades:

                                {abilities.map((ability, index) => (
                                    <span
                                        key={ability.name}
                                        className={styles.valores_dados}
                                    >
                                        <>
                                            {index > 0 && " / "}

                                            {ability.name}

                                            {ability.hidden && " (Hidden)"}
                                        </>
                                    </span>
                                ))}
                            </p>
                        </div>

                        <div className={`${styles.fundo_dados} ${styles.descricao_dados}`}>
                            <p className={styles.item_dados}>Descrição: <span className={styles.valores_dados}>{cleanFlavorText}</span></p>
                        </div>
                    </div>
                </section>

                {/* tipagem */}
                <div className={`${styles.section_pokemon} ${styles.section_tipos}`}>
                    <h2 className={styles.h2_descricao}>Tipo</h2>

                    <div className={styles.container_tipos}>
                        {pokemon.types.map((type) => (
                            <span
                                key={type.type.name}
                                className={styles.tipo_pokemon}
                                data-type={type.type.name}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>

                    <h2 className={styles.h2_descricao}>
                        Matchups
                    </h2>

                    <div className={styles.container_tipos}>
                        {matchups.map(([typeName, multiplier]) => (
                            <span
                                key={typeName}
                                className={styles.tipo_pokemon}
                                data-type={typeName}
                            >
                                {typeName}

                                {" "}

                                x{multiplier}
                            </span>
                        ))}
                    </div>

                </div>

                {/* stats */}
                <section className={`${styles.section_pokemon} ${styles.section_stats}`}>
                    <h2 className={styles.h2_descricao}>Stats</h2>


                    <StatsGroup stats={stats} />
                </section>

                {/* linha evolutiva */}
                <section className={`${styles.section_pokemon} ${styles.section_evolucao}`}>
                    <h2 className={styles.h2_descricao}>Linha Evolutiva</h2>

                    <div className={styles.container_evolucao}>
                        <div className={styles.divisoria_evo}>
                            <div className={styles.borda_evo}>
                                <Image src="/016.png" width={200} height={200} alt="Pokémon" className={styles.evo_pokemon}></Image>
                            </div>

                            <div>
                                <p className={styles.poke_nome}>Pidgey</p>

                                <p className={styles.poke_num}>#0016</p>
                            </div>

                            <div className={styles.tipo_evo}>
                                <span className={styles.tipo_pokemon} data-type="normal">Normal</span>

                                <span className={styles.tipo_pokemon} data-type="flying">Flying</span>
                            </div>
                        </div>

                        <IconeBaixo className={styles.icone_evo} />

                        <div className={styles.divisoria_evo}>
                            <div className={styles.borda_evo}>
                                <Image src="/017.png" width={200} height={200} alt="Pokémon" className={styles.evo_pokemon}></Image>
                            </div>

                            <div>
                                <p className={styles.poke_nome}>Pidgeotto</p>

                                <p className={styles.poke_num}>#0017</p>
                            </div>

                            <div className={styles.tipo_evo}>
                                <span className={styles.tipo_pokemon} data-type="normal">Normal</span>

                                <span className={styles.tipo_pokemon} data-type="flying">Flying</span>
                            </div>
                        </div>

                        <IconeBaixo className={styles.icone_evo} />

                        <div className={styles.divisoria_evo}>
                            <div className={styles.borda_evo}>
                                <Image src="/018.png" width={200} height={200} alt="Pokémon" className={styles.evo_pokemon}></Image>
                            </div>

                            <div>
                                <p className={styles.poke_nome}>Pidgeot</p>

                                <p className={styles.poke_num}>#0018</p>
                            </div>

                            <div className={styles.tipo_evo}>
                                <span className={styles.tipo_pokemon} data-type="normal">Normal</span>

                                <span className={styles.tipo_pokemon} data-type="flying">Flying</span>
                            </div>
                        </div>
                    </div>

                    <p className={styles.obs}><strong>Observação:</strong> Os dados da API pokédex vem com suporte completo em inglês. Como português não esta completo e pra evitar inconsistência na dex, mantive os dados em inglês.</p>
                </section>
            </main>
        </div>
    )
}