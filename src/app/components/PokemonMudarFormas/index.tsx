"use client";
import { useState } from "react";
import styles from "./PokemonMudarFormas.module.css";
import { PokemonForm } from "@/types/forms";

interface PokemonChangeFormsProps {
    forms: PokemonForm[];
}

export function PokemonMudarFormas({ forms, }: PokemonChangeFormsProps) {
    const defaultForm = forms.find((form) => form.isDefault);

    const [selectedForm, setSelectedForm] = useState(defaultForm?.slug);

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