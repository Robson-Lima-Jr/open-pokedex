import { useEffect, useState, useCallback, useRef } from "react";

export function usePokemonList() {
    const [pokemons, setPokemons] = useState<any[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const limit = 30;
    const isFetchingRef = useRef(false);
    const hasLoadedOnce = pokemons.length > 0;
    const hasMore = pokemons.length < 1026;

    const fetchDetails = async (results: { url: string }[]) => {
        return Promise.all(
            results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return res.json();
            })
        );
    };

    const fetchPokemons = useCallback(async () => {
        if (isFetchingRef.current) return;

        try {
            isFetchingRef.current = true;
            setError(null);

            // define qual loading ativar
            if (offset === 0) {
                setIsInitialLoading(true);
            } else {
                setIsFetchingMore(true);
            }

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            );

            if (!response.ok) {
                throw new Error("Erro ao buscar lista");
            }

            const data = await response.json();
            const detailed = await fetchDetails(data.results);

            setPokemons((prev) => {
                const novos = detailed.filter(
                    (p: any) =>
                        p.id <= 1025 &&
                        !prev.some((existing) => existing.id === p.id)
                );

                return [...prev, ...novos];
            });
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar Pokémon");
        } finally {
            setIsInitialLoading(false);
            setIsFetchingMore(false);
            isFetchingRef.current = false;
        }
    }, [offset]);

    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons]);

    const loadMore = useCallback(() => {
        if (!isFetchingRef.current && pokemons.length < 1025) {
            setOffset((prev) => prev + limit);
        }
    }, [pokemons.length]);

    return {
        pokemons,
        isInitialLoading,
        isFetchingMore,
        error,
        hasLoadedOnce,
        hasMore,
        loadMore
    };
}