export type FormCategory = | "base" | "form" | "regional" | "mega";

export interface PokemonForm {
    slug: string;
    shortLabel: string;
    fullLabel: string;
    category: FormCategory;
    isDefault: boolean;
}

export interface PokemonFormsData {
    pokemonName: string;
    forms: PokemonForm[];
}