import styles from "./page.module.css";
import Link from "next/link";
import { IconeSeta, IconeLink, IconeBaixo } from "../../components/icons/Icons";
import { StatsGroup } from "@/app/components/Stats/StatsGroup";
import Image from "next/image";

export default function PokemonPage({ params }: { params: { id: string } }) {
    const mockStats = {
        hp: 95,
        atk: 20,
        def: 65,
        spa: 131,
        spd: 55,
        spe: 151,
    };

    return (
        <div className={styles.center}>
            <main className={styles.container_pokemon}>

                {/* cabeçalho pokémon */}
                <section className={styles.header_pokemon}>
                    <div className={styles.nav_pokemon}>
                        <Link href="#" className={styles.link_pokemon}>
                            <IconeLink className={styles.link_icon} />
                            <span>#0017</span> Pidgeotto
                        </Link>

                        <Link href="#" className={styles.link_pokemon}>
                            <span>#0019</span> Rattata
                            <IconeSeta className={styles.link_icon} />
                        </Link>
                    </div>

                    <h1 className={styles.h1_pokemon}>Pidgeot</h1>
                </section>

                {/* imagem do pokemon */}
                <section className={styles.imagem_area}>
                    <Image src="/018.png" width={400} height={400} alt="Pokémon" className={styles.imagem_pokemon}></Image>
                </section>

                {/* dados pokemon */}
                <section className={`${styles.section_pokemon} ${styles.section_dados}`}>
                    <h2 className={styles.h2_descricao}>Dados na Pokédex</h2>

                    <div>
                        <div className={styles.fundo_dados}>
                            <p className={styles.item_dados}>Nº Pokédex: <span className={styles.valores_dados}>#0018</span></p>

                            <p className={styles.item_dados}>Altura: <span className={styles.valores_dados}>1.50 m</span></p>

                            <p className={styles.item_dados}>Peso: <span className={styles.valores_dados}>30 kg</span></p>

                            <p className={styles.item_dados}>Gênero: <span className={styles.valores_dados}>Desconhecido</span></p>

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
                        <span className={styles.tipo_pokemon} data-type="normal">Normal</span>

                        <span className={styles.tipo_pokemon} data-type="flying">Flying</span>
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


                    <StatsGroup stats={mockStats} />
                </section>
                
                {/* linha evolutiva */}
                <section className={`${styles.section_pokemon} ${styles.section_evolucao}`}>
                    <h2 className={styles.h2_descricao}>Linha Evolutiva</h2>

                    <div className={styles.container_evolucao}>
                        <div className={styles.divisoria_evo}>
                            <div className={styles.borda_evo}>
                                <Image src="/016.png" width={200} height={200} alt="Pokémon" className={styles.evo_pokemon}></Image>
                            </div>

                            <p className={styles.poke_nome}>Pidgey <span className={styles.poke_num}>#0016</span></p>

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

                            <p className={styles.poke_nome}>Pidgeotto <span className={styles.poke_num}>#0017</span></p>

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