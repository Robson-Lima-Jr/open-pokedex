import { IconePokeball } from "../icons/Icons";
import styles from "./PokemonLista.module.css";
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

export default function PokemonLista({ pokemon }: PokemonCardProps) {
    return (
        <article className={styles.lista_container}>
            <IconePokeball className={styles.icone_lista} />

            <div className={styles.area_info}>
                <span className={styles.dex_num}>#{pokemon.id.toString().padStart(4, "0")}</span>

                <div className={styles.sprite_area}>
                    <Image src={pokemon.sprites.front_default} width={96} height={96} alt="pidgeot" className={styles.image} />
                </div>

                <p className={styles.lista_nome}>{pokemon.name}</p>

                <div className={styles.tipos_area}>
                    {pokemon.types.map((typeInfo) => (
                        <span key={typeInfo.type.name}>
                            {typeInfo.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    )
}