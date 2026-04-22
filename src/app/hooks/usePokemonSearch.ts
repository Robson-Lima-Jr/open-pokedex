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

        // se não tem filtro, limpa tudo
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

                let finalResults: any[] = [];

                // base inicial
                if (search) {
                    const ids = Array.from({ length: 1025 }, (_, i) => i + 1);

                    const promises = ids.map((id) =>
                        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                            .then(res => res.json())
                    );

                    finalResults = await Promise.all(promises);
                }

                else if (selectedType) {
                    const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);

                    if (!res.ok) throw new Error();

                    const data = await res.json();

                    const promises = data.pokemon.map((p: any) =>
                        fetch(p.pokemon.url).then(res => res.json())
                    );

                    finalResults = await Promise.all(promises);
                }

                else {
                    // base = TODOS (região ou fallback)
                    const regionData = pokemonRegions.find(r => r.id === selectedRegion);

                    const ids = regionData
                        ? Array.from(
                            { length: regionData.max - regionData.min + 1 },
                            (_, i) => regionData.min + i
                        )
                        : Array.from({ length: 1025 }, (_, i) => i + 1);

                    const promises = ids.map((id) =>
                        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                            .then(res => res.json())
                    );

                    finalResults = await Promise.all(promises);
                }

                // filtro por nome parcial
                if (search) {
                    finalResults = finalResults.filter((p) =>
                        p.name.toLowerCase().includes(search.toLowerCase())
                    );
                }

                // filtro por tipo
                if (selectedType) {
                    finalResults = finalResults.filter((p) =>
                        p.types.some((t: any) => t.type.name === selectedType)
                    );
                }

                // filtro por região
                if (selectedRegion) {
                    const regionData = pokemonRegions.find(r => r.id === selectedRegion);

                    finalResults = finalResults.filter((p) =>
                        p.id >= regionData!.min &&
                        p.id <= regionData!.max
                    );
                }

                setResults(finalResults);
            } catch (err) {
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