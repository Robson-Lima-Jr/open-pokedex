import styles from "./PokedexAside.module.css";
import pokemonTypes from "@/app/data/pokemonTypes";
import regions from "@/app/data/regions";

export default function PokedexAside() {
    return (
        <aside className={styles.container_aside}>
            <h2 className={styles.h2_aside}><span>◓</span> Filtros</h2>

            {/* Busca por texto */}
            <div className={styles.aside_bloco}>
                <label htmlFor="busca" className={styles.label_busca}>
                    Buscar Pokémon
                </label>

                <input type="text"
                       id="busca"
                       placeholder="Nome ou número"
                       className={styles.input_busca}
                />
            </div>

            {/* tipos */}
            <div className={styles.aside_bloco}>
                <button className={styles.aside_botao}>
                    <span>▶</span> Tipos
                </button>

                <ul className={styles.aside_ul}>
                    {pokemonTypes.map((type) => (
                        <li key={type.id} className={styles.aside_li}> 
                            <span>◓</span> {type.namePt} ({type.nameEn})
                        </li>
                    ))}
                </ul>
            </div>

            {/* Região */}
            <div className={styles.aside_bloco}>
                <button className={styles.aside_botao}>
                    <span>▶</span> Regiões
                </button>

                <ul className={styles.aside_ul}>
                    {regions.map ((region) => (
                        <li key={region.id} className={styles.aside_li}>
                            <span>◓</span> {region.namePt}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}