import styles from "./PokedexAside.module.css";

export default function PokedexAside() {
    return (
        <aside className={styles.container_aside}>
            <h2 className={styles.h2_aside}><span>◓</span>Filtros</h2>

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
            </div>

            {/* Região */}
            <div className={styles.aside_bloco}>
                <button className={styles.aside_botao}>
                    <span>▶</span> Regiões
                </button>
            </div>
        </aside>
    )
}