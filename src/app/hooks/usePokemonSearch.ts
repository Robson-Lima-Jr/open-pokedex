import { useEffect, useState } from "react";
import pokemonRegions from "../data/regions";

type Props = {
    search: string;
    selectedType: string | null;
    selectedRegion: number | null;
};

export function usePokemonSearch({ search, selectedType, selectedRegion }: Props) {
    const [results, setResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const hasFilter = search || selectedType || selectedRegion;

        if (!hasFilter) {
            setResults([]);
            setIsSearching(false);
            setNotFound(false);
            return;
        }

        const fetchSearch = async () => {
            try {
                setIsSearching(true);
                setNotFound(false);

                let baseResults: any[] = [];

                // busca por tipo (base principal)
                if (selectedType) {
                    const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);

                    if (!res.ok) throw new Error();

                    const data = await res.json();

                    const promises = data.pokemon.map((p: any) =>
                        fetch(p.pokemon.url).then(res => res.json())
                    );

                    baseResults = await Promise.all(promises);

                    baseResults = baseResults.filter(p => p.id <= 1025);
                }

                // busca direta por nome (apenas 1)
                else if (search && !selectedType && !selectedRegion) {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);

                    if (!res.ok) throw new Error();

                    const data = await res.json();

                    baseResults = [data];
                }

                // fallback região ou geral
                else {
                    const regionData = pokemonRegions.find(r => r.id === selectedRegion);

                    const ids = regionData
                        ? Array.from(
                            { length: regionData.max - regionData.min + 1 },
                            (_, i) => regionData.min + i
                        )
                        : [];

                    const promises = ids.map((id) =>
                        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                            .then(res => res.json())
                    );

                    baseResults = await Promise.all(promises);
                }

                // filtro por nome parcial
                if (search) {
                    baseResults = baseResults.filter((p) =>
                        p.name.toLowerCase().includes(search.toLowerCase())
                    );
                }

                // filtro por região
                if (selectedRegion) {
                    const regionData = pokemonRegions.find(r => r.id === selectedRegion);

                    baseResults = baseResults.filter((p) =>
                        p.id >= regionData!.min &&
                        p.id <= regionData!.max
                    );
                }

                setResults(baseResults);

                if (baseResults.length === 0) {
                    setNotFound(true);
                }

            } catch {
                setResults([]);
                setNotFound(true);
            } finally {
                setIsSearching(false);
            }
        };

        fetchSearch();
    }, [search, selectedType, selectedRegion]);

    return {
        results,
        isSearching,
        notFound,
        isActive: !!(search || selectedType || selectedRegion)
    };
}