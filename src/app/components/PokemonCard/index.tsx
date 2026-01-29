import styles from "./PokemonCard.module.css";
import Image from "next/image";

export default function PokemonCard() {
    return (
        <article className={styles.card_container}>
            <div className={styles.card_cima}>
                <div className={styles.sprite_area}>
                    <Image src="/pidgeot.png" width={80} height={80} alt="pidgeot" className={styles.image}/>

                    <span className={styles.dex_num}>#016</span>
                </div>

                <div className={styles.header_poke}>
                    <h2 className={styles.nome}>Pidgeot</h2>

                    <div className={styles.tipos_area}>
                        <p className={styles.tipos_desc}>Tipo <span>1</span>/</p>
                        <p className={styles.tipos}>Normal</p>
                    </div>

                    <div className={styles.tipos_area}>
                        <p className={styles.tipos_desc}>Tipo <span>2</span>/</p>
                        <p className={styles.tipos}>Flying</p>
                    </div>
                </div>
            </div>

            <div className={styles.stats_area}>
                <ul className={styles.stats}>
                    <li className={styles.stats_li}><span>HP</span><strong>200</strong></li>

                    <li className={styles.stats_li}><span>ATTACK</span><strong>135</strong></li>

                    <li className={styles.stats_li}><span>DEFENSE</span><strong>157</strong></li>

                    <li className={styles.stats_li}><span>SP.ATTACK</span><strong>121</strong></li>

                    <li className={styles.stats_li}><span>SP.DEFENSE</span><strong>121</strong></li>

                    <li className={styles.stats_li}><span>SPEED</span><strong>150</strong></li>
                </ul>
            </div>
        </article>
    )
}