import { IconePokeball } from "../icons/Icons";
import styles from "./PokemonLista.module.css";
import Image from "next/image";

export default function PokemonLista() {
    return (
        <article className={styles.lista_container}>
            <IconePokeball className={styles.icone_lista} />

            <div className={styles.area_info}>
                <span className={styles.dex_num}>0016</span>

                <div className={styles.sprite_area}>
                    <Image src="/pidgeot.png" width={50} height={50} alt="pidgeot" className={styles.image} />
                </div>

                <p className={styles.lista_nome}>Feraligatrz</p>

                <div className={styles.tipos_area}>
                    <span>Normal</span>
                    <span>Fighting</span>
                </div>
            </div>
        </article>
    )
}