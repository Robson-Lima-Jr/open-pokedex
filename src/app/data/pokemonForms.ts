import { PokemonFormsData } from "@/types/forms";

export const pokemonForms: Record<string, PokemonFormsData> = {
    deoxys: {
        pokemonName: "deoxys",
        forms: [
            {
                slug: "normal",
                shortLabel: "Normal",
                fullLabel: "Deoxys Normal Form",
                category: "base",
                isDefault: true
            },
            {
                slug: "attack",
                shortLabel: "Attack",
                fullLabel: "Deoxys Attack Form",
                category: "form",
                isDefault: false
            },
            {
                slug: "defense",
                shortLabel: "Defense",
                fullLabel: "Deoxys Defense Form",
                category: "form",
                isDefault: false
            },
            {
                slug: "speed",
                shortLabel: "Speed",
                fullLabel: "Deoxys Speed Form",
                category: "form",
                isDefault: false
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
                category: "base",
                isDefault: true
            },
            {
                slug: "origin",
                shortLabel: "Origin",
                fullLabel: "Giratina Origin Form",
                category: "form",
                isDefault: false
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
                category: "base",
                isDefault: true
            },
            {
                slug: "alola",
                shortLabel: "Alola",
                fullLabel: "Alolan Raichu",
                category: "regional",
                isDefault: false
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
                category: "base",
                isDefault: true
            },
            {
                slug: "mega-x",
                shortLabel: "Mega X",
                fullLabel: "Mega Charizard X",
                category: "mega",
                isDefault: false
            },
            {
                slug: "mega-y",
                shortLabel: "Mega Y",
                fullLabel: "Mega Charizard Y",
                category: "mega",
                isDefault: false
            }
        ]
    }
};