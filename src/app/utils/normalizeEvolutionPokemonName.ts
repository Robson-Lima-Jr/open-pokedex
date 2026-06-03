import { defaultFormBySpecies } from "../data/defaultFomBySpecies";

export function normalizeEvolutionPokemonName(name: string) {
    return defaultFormBySpecies[name] || name;
};