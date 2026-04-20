"use client";
import styles from "./BotaoFly.module.css";
import { useState, useEffect } from "react";

export default function BotaoFly() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(true);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    if(!visible) return null;

    return(
        <button onClick={scrollToTop} className={styles.fly_pokemon}>
            <img src={"/botao_fly/pidgey.png"} alt="Clique para Voar ao topo" title="Clique para voar ao topo" className={styles.sprite_fly}/>
        </button>
    );
}