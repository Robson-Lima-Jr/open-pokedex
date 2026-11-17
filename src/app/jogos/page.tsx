import styles from "./Jogos.module.css";
import { IconePokeball, IconeSeta } from "../components/icons/Icons";

export default function Jogos() {
    return (
        <div className="container_base">
            <div className="titulo_area">
                <div>
                    <h1 className="titulo_h1">
                        <div className="icone_wrap">
                            <IconePokeball className="h1_icone" />
                        </div>

                        <span className="texto_titulo">Pokédex</span>
                    </h1>

                    <p className="paragrafo_h1">Jogos</p>
                </div>
            </div>

            <section className="section_main">
                <p className="texto_p">Página ainda não criada. No momento essa página ainda está em desenvolvimento. </p>
            </section>
        </div>
    )
}