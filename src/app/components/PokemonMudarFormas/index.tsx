"use client";
import styles from "./PokemonMudarFormas.module.css";
import { PokemonForm } from "@/types/forms";

interface PokemonChangeFormsProps {
    forms: PokemonForm[];
}

export function PokemonMudarFormas({ forms, }: PokemonChangeFormsProps) {
    return (
        <div>
            {forms.map((form) => (
                <button key={form.slug}>
                    {form.shortLabel}
                </button>
            ))}
        </div>
    )
}