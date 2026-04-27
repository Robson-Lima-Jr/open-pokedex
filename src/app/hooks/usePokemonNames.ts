import { useEffect, useState } from "react";

export function usePokemonsNames() {
    const [names, setNames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNames = async () => {
            try {
                const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");

                if (!res.ok) throw new Error();

                const data = await res.json();

                const allNames = data.results.map((p: any) => p.name);

                setNames(allNames);
            } catch (err) {
                console.error("Erro ao carregar nomes");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNames();
    }, []);

    return {
        names,
        isLoading
    };
}