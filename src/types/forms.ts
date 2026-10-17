export type FormCategory =
    | "base"
    | "form"
    | "regional"
    | "mega"
    | "mega-x"
    | "mega-y"
    | "mega-z"
    | "g-max";

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