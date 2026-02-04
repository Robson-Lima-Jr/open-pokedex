import styles from "./page.module.css";
import Link from "next/link";
import { IconeSeta, IconeLink } from "../../components/icons/Icons";
import Image from "next/image";

export default function PokemonPage({ params }: { params: { id: string } }) {
    return (
        <div className={styles.center}>
            <main className={styles.container_pokemon}>
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

                <section className={styles.imagem_area}>
                    <Image src="/018.png" width={200} height={200} alt="Pokémon" className={styles.imagem_pokemon}></Image>
                </section>

                <section className={styles.dados_pokemon}>
                    <h2 className={styles.h2_descricao}>Dados na Pokédex</h2>

                    <span className={styles.dex_num}><strong>Nº Pokédex: </strong>#0018</span>

                    <div className={styles.tipos_area}>
                        <span className={styles.dex_num}><strong>Tipo: </strong></span>

                        <span className={styles.tipo_pokemon} data-type="normal">Normal</span>

                        <span className={styles.tipo_pokemon} data-type="flying">Flying</span>
                    </div>

                    <div className={styles.habilidade_area}>
                        <span className={styles.dex_num}><strong>Habilidade: </strong></span>

                        <span className={styles.habilidade_pokemon}>1 No Guard(Sem guarda)</span>

                        <span className={styles.habilidade_pokemon}>2 Levitate (Levitação)</span>
                    </div>
                </section>

                <section className={styles.descricao_area}>
                    <p className={styles.descricao}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam asperiores commodi est! Eos, consequatur. Illum minus optio earum ipsam distinctio dolorem quae consequuntur aspernatur, explicabo, omnis et voluptates vitae itaque!</p>
                </section>

                <section className={styles.fraqueza_area}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, cupiditate, dolor alias doloremque saepe quisquam amet quod quia ipsa eum praesentium quibusdam ex in perspiciatis officia repellat obcaecati ipsam corporis.</p>
                </section>

                <section className={styles.container_stats}>
                </section>

                <section className={styles.linha_evolutiva}>
                </section>
            </main>
        </div>
    )
}