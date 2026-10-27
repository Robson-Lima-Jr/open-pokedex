
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

                const label =
                    form.isDefault && form.slug === "base"
                        ? pokemonName
                        : form.shortLabel;

                const megaImage =
                    form.category === "mega-x"
                        ? "/mega-x.png"
                        : form.category === "mega-y"
                            ? "/mega-y.png"
                            : form.category === "mega-z"
                                ? "/mega-z.png"
                                : "/mega.png";

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
                                <img
                                    src={megaImage}
                                    alt="mega stone"
                                    className={styles.icone_mega}
                                />
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
