import styles from "./page.module.css";
import Link from "next/link";
import { IconeSeta, IconeLink, IconeBaixo } from "../../components/icons/Icons";
import { StatsGroup } from "@/app/components/Stats/StatsGroup";
import Image from "next/image";
import { stat } from "fs";

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

    const stats = {
        hp: pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat || 0,
        atk: pokemon.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0,
        def: pokemon.stats.find((stat) => stat.stat.name === "defense")?.base_stat || 0,
        spa: pokemon.stats.find((stat) => stat.stat.name === "special-attack")?.base_stat || 0,
        spd: pokemon.stats.find((stat) => stat.stat.name === "special-defense")?.base_stat || 0,
        spe: pokemon.stats.find((stat) => stat.stat.name === "speed")?.base_stat || 0
    }

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

                            <p className={styles.item_dados}>Altura: <span className={styles.valores_dados}>{pokemon.height} m</span></p>

                            <p className={styles.item_dados}>Peso: <span className={styles.valores_dados}>{pokemon.weight} kg</span></p>

                            <p className={styles.item_dados}>Gênero: <span className={styles.valores_dados}></span></p>

                            <p className={styles.item_dados}>Categoria: <span className={styles.valores_dados}>Bola</span></p>

                            <p className={styles.item_dados}>Habilidades: <span className={styles.valores_dados}>No Guard</span> / <span className={styles.valores_dados}>Overgrow</span></p>
                        </div>

                        <div className={`${styles.fundo_dados} ${styles.descricao_dados}`}>
                            <p className={styles.item_dados}>Descrição: <span className={styles.valores_dados}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, cupiditate, dolor alias doloremque saepe quisquam amet quod quia ipsa eum praesentium quibusdam ex in perspiciatis officia repellat obcaecati ipsam corporis.</span></p>
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

                    {/* fraquezas */}
                    <h2 className={styles.h2_descricao}>Fraquezas</h2>

                    <div className={styles.container_tipos}>
                        <span className={styles.tipo_pokemon} data-type="electric">Electric</span>

                        <span className={styles.tipo_pokemon} data-type="ice">Ice</span>

                        <span className={styles.tipo_pokemon} data-type="rock">Rock</span>
                    </div>

                    {/* resistencias */}
                    <h2 className={styles.h2_descricao}>Resistências</h2>

                    <div className={styles.container_tipos}>
                        <span className={styles.tipo_pokemon} data-type="grass">Grass</span>

                        <span className={styles.tipo_pokemon} data-type="bug">Bug</span>

                        <span className={styles.tipo_pokemon} data-type="ground">Ground</span>

                        <span className={styles.tipo_pokemon} data-type="ghost">Ghost</span>
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
                </section>
            </main>
        </div>
    )
}