import { PokemonFormsData } from "@/types/forms";

export const pokemonForms: Record<string, PokemonFormsData> = {
    deoxys: {
        pokemonName: "deoxys",
        forms: [
            {
                slug: "normal",
                shortLabel: "Normal",
                fullLabel: "Deoxys Normal Form",
                category: "base"
            },
            {
                slug: "attack",
                shortLabel: "Attack",
                fullLabel: "Deoxys Attack Form",
                category: "form"
            },
            {
                slug: "defense",
                shortLabel: "Defense",
                fullLabel: "Deoxys Defense Form",
                category: "form"
            },
            {
                slug: "speed",
                shortLabel: "Speed",
                fullLabel: "Deoxys Speed Form",
                category: "form"
            }
        ]
    },

    giratina: {
        pokemonName: "giratina",
        forms: [
            {
                slug: "altered",
                shortLabel: "Altered",
                fullLabel: "Giratina Altered Form",
                category: "base"
            },
            {
                slug: "origin",
                shortLabel: "Origin",
                fullLabel: "Giratina Origin Form",
                category: "form"
            }
        ]
    },

    raichu: {
        pokemonName: "raichu",
        forms: [
            {
                slug: "base",
                shortLabel: "Base",
                fullLabel: "Raichu",
                category: "base"
            },
            {
                slug: "alola",
                shortLabel: "Alola",
                fullLabel: "Alolan Raichu",
                category: "regional"
            }
        ]
    },

    charizard: {
        pokemonName: "charizard",
        forms: [
            {
                slug: "base",
                shortLabel: "Base",
                fullLabel: "Charizard",
                category: "base"
            },
            {
                slug: "mega-x",
                shortLabel: "Mega X",
                fullLabel: "Mega Charizard X",
                category: "mega"
            },
            {
                slug: "mega-y",
                shortLabel: "Mega Y",
                fullLabel: "Mega Charizard Y",
                category: "mega"
            }
        ]
    }
};