"use client";
import React from "react";
import styles from "./PokemonMudarFormas.module.css";
import { PokemonForm } from "@/types/forms";

interface PokemonChangeFormsProps {
    forms: PokemonForm[];
    selectedForm?: string;
    setSelectedForm: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function PokemonMudarFormas({ forms, selectedForm, setSelectedForm }: PokemonChangeFormsProps) {

    return (
        <div className={styles.container_botoes}>
            {forms.map((form) => (
                <button key={form.slug}
                    onClick={() => setSelectedForm(form.slug)}
                    className={selectedForm === form.slug ? styles.botao_ativo : styles.botao_desativado}>
                    {form.shortLabel}
                </button>
            ))}
        </div>
    )
}