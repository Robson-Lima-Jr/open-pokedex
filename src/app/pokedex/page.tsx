import styles from "./pokedex.module.css";

export default function pokedex() {
    return (
        <main className="container_base">
            <div className="titulo_area">
                <h1 className="titulo_h1">
                    <span className="h1_icone">◓</span>

                    <span>Pokédex</span>
                </h1>

                <p className="paragrafo_h1">Database</p>
            </div>

            <section className={`section_main ${styles.container_pokedex}`}>
                <h2 className="subtitulo_h2">▶ Nacional <span>Dex</span></h2>
                
                
            </section>
        </main>
    )
}