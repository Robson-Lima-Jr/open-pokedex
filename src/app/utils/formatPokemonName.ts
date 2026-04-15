export function formatPokemonName(name: string): string {
    const lower = name.toLocaleLowerCase();

    // Paradox Pokémon, nomes diferentes
    const paradoxList = [
        "great-tusk",
        "scream-tail",
        "brute-bonnet",
        "flutter-mane",
        "slither-wing",
        "sandy-shocks",
        "iron-treads",
        "iron-bundle",
        "iron-hands",
        "iron-jugulis",
        "iron-moth",
        "iron-thorns",
        "roaring-moon",
        "iron-valiant",
        "walking-wake",
        "iron-leaves",
        "gouging-fire",
        "raging-bolt",
        "iron-boulder",
        "iron-crown"
    ];

    const keepName = [
        "chien-pao",
        "chi-yu",
        "wo-chien",
        "ting-lu"
    ];

    let result = "";

    // nao muda os nomes
    if (keepName.includes(lower)) {
        result = lower
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join("-");
    }

    // converter os paradox
    else if (paradoxList.includes(lower)) {
        const [first, second] = lower.split("-");
        result = `${first.charAt(0).toUpperCase()}. ${second.charAt(0).toUpperCase()}${second.slice(1)}`;
    }

    // converte todos com hifen menos paradox
    else if (lower.includes("-")) {
        const base = lower.split("-")[0];
        result = base.charAt(0).toUpperCase() + base.slice(1);
    }

    // conversao normal
    else {
        result = lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    // limite de 11 caracteres no nome
    if (result.length > 11) {
        return result.slice(0, 9) + "...";
    }

    return result;
}