import { PokemonForm } from "@/types/forms";

export function getFormPokemonApiName (pokemonName: string, form: PokemonForm) {
    if(form.slug === "base") {
        return pokemonName;
    }

    return `${pokemonName}-${form.slug}`;
};