import styles from "./Rodape.module.css";

export default function Rodape() {
    return (
        <footer className={styles.rodape_fundo}>
            <div className={styles.container_rodape}>
                <h2>Open Pokédex - Projeto independente de estudo</h2>

                <a href="https://github.com/Robson-Lima-Jr/open-pokedex" target="_blank">Repositório do Projeto.</a>

                <p>Pokémon e todo o universo da franquia, incluindo personagens, nomes e imagens, pertencem aos seus respectivos criadores e proprietários:{" "} <a href="https://www.nintendo.com/" target="_blank" rel="noopener noreferrer"> Nintendo</a>
                    ,{" "} <a href="https://corporate.pokemon.co.jp/" target="_blank" rel="noopener noreferrer">The Pokémon Company</a>
                    ,{" "} <a href="https://www.creatures.co.jp/" target="_blank" rel="noopener noreferrer"> Creatures Inc.</a>
                    {" "} e{" "} <a href="https://www.gamefreak.co.jp/" target="_blank" rel="noopener noreferrer"> GAME FREAK inc.</a>
                    © 1995–2026 Todos os direitos reservados.
                </p>

                <p>A Open Pokédex é um projeto independente, criado para fins de estudo e sem vínculo oficial com essas empresas. Conheça mais no{" "}<a href="https://www.pokemon.com/br/" target="_blank" rel="noopener noreferrer">site oficial de Pokémon.</a> </p>
            </div>
        </footer>
    )
}