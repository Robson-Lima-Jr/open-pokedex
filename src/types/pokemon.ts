// Interface de pokemon data 
export interface PokemonData {
    id: number;
    name: string;

    height: number;
    weight: number;

    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };

    types: {
        type: {
            name: string;
        };
    }[];

    abilities: {
        ability: {
            name: string;
            url: string;
        };

        is_hidden: boolean;
    }[];

    stats: {
        base_stat: number;

        stat: {
            name: string;
        };
    }[];
}

// export interface de species, serve pra dados como descrição e genero
export interface PokemonSpecies {
    flavor_text_entries: {
        flavor_text: string;

        language: {
            name: string;
        };
    }[];

    genera: {
        genus: string;

        language: {
            name: string;
        };
    }[];

    gender_rate: number;

    evolution_chain: {
        url: string;
    }

    varieties: {
        is_default: boolean;
        pokemon: {
            name: string;
            url: string;
        }
    }[];
}

// export interface para os titulos
export interface TypeData {
    damage_relations: {
        double_damage_from: {
            name: string;
        }[];

        half_damage_from: {
            name: string;
        }[];

        no_damage_from: {
            name: string;
        }[];
    }
}

// interfaces de linha evolutiva
export interface EvolutionPokemon {
    id: number;
    nationalDexNumber: number;
    name: string;

    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };

    types: {
        type: {
            name: string;
        };
    }[];
}

export interface EvolutionChain {
    chain: EvolutionLink;
}

export interface EvolutionLink {
    species: {
        name: string;
        url: string;
    };

    evolves_to: EvolutionLink[];

    evolution_details: {
        trigger: {
            name: string;
            url: string;
        } | null;

        item: {
            name: string;
            url: string;
        } | null;

        held_item: {
            name: string;
            url: string;
        } | null;

        known_moves: {
            name: string;
            url: string;
        } | null;

        min_level: number | null;

        location: {
            name: string;
            url: string;
        } | null;

        party_species: {
            name: string;
            url: string;
        } | null;

        trade_species: {
            name: string;
            url: string;
        } | null;

        gender: number | null;

        turn_upside_down: boolean;

        needs_overworld_rain: boolean;

        // idententificar formas evolução
        // PokeApi pode fornecer esses campos
        required_pokemon_form: {
            name: string;
            url: string;
        } | null;

        evolved_pokemon_form: {
            name: string
            url: string;
        } | null;

        is_default: boolean;

        version_group: {
            name: string;
            url: string;
        } | null;

        region: {
            name: string;
            url: string;
        } | null;
    }[];
}

// export interface pra pokemons com multiplas evoluçoes (arrumar o css pra ficar melhor)
export interface EvolutionNode {
    id?: string;
    name: string;
    pokemonName?: string;
    region?: string;
    children: EvolutionNode[];
};

// export interface para habilidades
export interface AbilityData {
    names: {
        name: string;
        language: {
            name: string
        };
    }[];

    effect_entries: {
        effect: string;
        language: {
            name: string;
        };
    }[];
}