export function formatFullPokemonName(name: string): string {
    const lower = name.toLowerCase();

    const keepName = [
        "chien-pao",
        "chi-yu",
        "wo-chien",
        "ting-lu",
        "ho-oh",
        "porygon-z",
        "jangmo-o",
        "hakamo-o",
        "kommo-o",
        "mr-mime",
        "mime-jr"
    ];

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

    if (keepName.includes(lower)) {
        return lower.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("-");
    };

    if (paradoxList.includes(lower)) {
        return lower
            .split("-")
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");
    }

    if (lower.includes("-")) {
        const base = lower.split("-")[0];

        return base.charAt(0).toUpperCase() + base.slice(1);
    };

    return lower.charAt(0).toUpperCase() + lower.slice(1);
}