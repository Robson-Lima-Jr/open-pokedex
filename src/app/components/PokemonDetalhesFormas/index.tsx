"use client";

import { useState } from "react";
import { PokemonFormsData } from "@/types/forms";
import { PokemonMudarFormas } from "../PokemonMudarFormas";
import { PokemonData } from "@/types/pokemon";

interface PokemonDetalhesFormasProps {
    formsData: PokemonFormsData;
    formsDataMap: Record<string, PokemonData>;
}

export function PokemonDetalhesFormas({ formsData, formsDataMap }: PokemonDetalhesFormasProps) {
    const defaultForm = formsData.forms.find((form) => form.isDefault);

    const [selectedForm, setSelectedForm] = useState(defaultForm?.slug);

    const currentFormData = selectedForm ? formsDataMap[selectedForm] : undefined;

    return (
        <div>
            <PokemonMudarFormas
                forms={formsData.forms}
                selectedForm={selectedForm}
                setSelectedForm={setSelectedForm}
                pokemonName={formsData.pokemonName}
                />

            <p>{currentFormData?.name}</p>

            <img
                src={
                    currentFormData?.sprites.other[
                        "official-artwork"
                    ].front_default
                }
                width={200}
                height={200}
                alt={currentFormData?.name || ""}
            />
        </div>

    )
}