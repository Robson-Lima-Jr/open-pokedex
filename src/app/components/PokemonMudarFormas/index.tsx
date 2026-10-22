
"use client";

import React from "react";
import styles from "./PokemonMudarFormas.module.css";
import { PokemonForm } from "@/types/forms";

interface PokemonChangeFormsProps {
    forms: PokemonForm[];
    selectedForm?: string;
    setSelectedForm: React.Dispatch<
        React.SetStateAction<string | undefined>
    >;
    pokemonName: string;
}

export function PokemonMudarFormas({
    forms,
    selectedForm,
    setSelectedForm,
    pokemonName,
}: PokemonChangeFormsProps) {
    return (
        <div className={styles.container_botoes}>
            {forms.map((form) => {
                const isMega = [
                    "mega",
                    "mega-x",
                    "mega-y",
                    "mega-z",
                ].includes(form.category);

                const label = form.isDefault
                    ? pokemonName
                    : form.shortLabel;

                const megaLetter =
                    form.category === "mega-x"
                        ? "X"
                        : form.category === "mega-y"
                            ? "Y"
                            : form.category === "mega-z"
                                ? "Z"
                                : "";

                return (
                    <button
                        key={form.slug}
                        onClick={() => setSelectedForm(form.slug)}
                        className={
                            selectedForm === form.slug
                                ? styles.botao_ativo
                                : styles.botao_desativado
                        }
                    >
                        {isMega ? (
                            <span className={styles.conteudo_mega}>
                                <span>Mega</span>

                                <img
                                    src="/mega_base.png"
                                    alt="mega stone"
                                    className={styles.icone_mega}
                                />
                                {megaLetter && (
                                    <span className={`${styles.letra_mega} ${styles[`letra_${form.category}`]
                                        }`}>{megaLetter}</span>
                                )}
                            </span>
                        ) : (
                            label
                        )}
                    </button>
                );
            })}
        </div>
    );
}
