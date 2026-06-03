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
}

// export interface pra pokemons com multiplas evoluçoes (arrumar o css pra ficar melhor)
export interface EvolutionNode {
    name: string;
    children: EvolutionNode[];
};
