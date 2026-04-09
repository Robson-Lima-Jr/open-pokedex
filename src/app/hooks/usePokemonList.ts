import { useEffect, useState, useCallback, useRef } from "react";

export function usePokemonList() {
    // pokemons
    const [pokemons, setPokemons] = useState<any[]>([]);
    // loading
    const [loading, setLoading] = useState(true);
    // loading pra cada chamada
    const [loadingMore, setLoadingMore] = useState(false);
    // offset
    const [offset, setOffset] = useState(0);
    // erro
    const [error, setError] = useState<string | null>(null);

    // limite de chamadas por vez na pokedex, pra nao carregar tudo de uma vez...
    const limit = 30

    //evitar varias chamadas simultaneas
    const isFetchingRef = useRef(false);

    // funçao que busca detalhes
    const fetchDetails = async (results: { url: string }[]) => {
        return Promise.all(
            results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return res.json();
            })
        );
    };

    // função principal de fetch
    const fetchPokemons = useCallback(async () => {
        if (isFetchingRef.current) return;

        try {
            isFetchingRef.current = true;
            setLoadingMore(true);
            setError(null);

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            );

            if (!response.ok) {
                throw new Error("Erro ao buscar lista");
            }

            const data = await response.json();

            const detailed = await fetchDetails(data.results);

            setPokemons(prev => {
                const novos = detailed.filter(
                    (p: any) =>
                        p.id <= 1025 &&
                        !prev.some(existing => existing.id === p.id)
                );

                return [...prev, ...novos];
            });

        } catch (err) {
            console.error(err);
            setError("Erro ao carregar Pokémon");
        } finally {
            setLoading(false);
            setLoadingMore(false);
            isFetchingRef.current = false;
        }
    }, [offset]);

    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons]);

    // loadMore seguro e estável
    const loadMore = useCallback(() => {
        if (!loadingMore && !isFetchingRef.current && pokemons.length < 1025) {
            setOffset(prev => prev + limit);
        }
    }, [loadingMore, pokemons.length]);

    return {
        pokemons,
        loading,
        loadingMore,
        error,
        loadMore
    };
}