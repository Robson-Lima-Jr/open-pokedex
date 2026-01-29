import styles from "./page.module.css";
import Link from "next/link";
import { IconeSeta } from "../../components/icons/Icons";
import Image from "next/image";

export default function PokemonPage() {
    return (
        <main className={styles.container_pokemon}>
            <section className={styles.header_pokemon}>
                <h1 className={styles.h1_pokemon}>
                    <span>#0018</span> Pidgeot
                </h1>

                <div className={styles.nav_pokemon}>
                    <Link href="#" className={styles.link_pokemon}>
                        <IconeSeta className={styles.link_icon}/>
                        <span>#0017</span> Pidgeotto
                    </Link>
                    
                    <Link href="#" className={styles.link_pokemon}>
                        <IconeSeta className={styles.link_icon}/>
                        <span>#0019</span> Rattata
                    </Link>
                </div>
            </section>

            <section className={styles.imagem_area}>
                <Image src="/018.png" width={200} height={200} alt="Pokémon" className={styles.imagem_pokemon}></Image>
            </section>

            <section className={styles.tipos_area}>
                <span className={styles.tipo_pokemon}>Normal</span>

                <span className={styles.tipo_pokemon}>Flying</span>
            </section>

            <section className={styles.habilidade_area}>
                <span className={styles.habilidade_pokemon}>1 No Guard(Sem guarda)</span>

                <span className={styles.habilidade_pokemon}>2 Levitate (Levitação)</span>
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
    )
}