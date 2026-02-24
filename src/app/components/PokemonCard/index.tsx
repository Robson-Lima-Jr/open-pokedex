import styles from "./PokemonCard.module.css";
import Image from "next/image";

interface PokemonCardProps {
    pokemon: {
        id: number;
        name: string;
        sprites: {
            front_default: string;
        };
        types: {
            slot: number;
            type: {
                name: string;
            };
        }[];
    };
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <article className={styles.card_container}>
            <div className={styles.card_cima}>
                {/* imagem e nº */}
                <div className={styles.sprite_area}>
                    <Image src={pokemon.sprites.front_default} width={100} height={100} alt={pokemon.name} className={styles.image} />

                    <span className={styles.dex_num}>#{pokemon.id.toString().padStart(4, "0")}</span>
                </div>

                {/* nome e tipos */}
                <div className={styles.header_poke}>
                    <h2 className={styles.nome}>{pokemon.name}</h2>

                    {pokemon.types.map((typeInfo, index) => (
                        <div
                            key={typeInfo.type.name}
                            className={styles.tipos_area}
                        >
                            <p className={styles.tipos_desc}>
                                Tipo {index + 1}/
                            </p>

                            <p className={styles.tipos}>
                                {typeInfo.type.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* stats */}
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