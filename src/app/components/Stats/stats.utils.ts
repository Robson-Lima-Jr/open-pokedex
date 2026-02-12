export const MAX_STATS = 255;

export function getStatColor(value: number): string {
    if (value < 30) return "#f34444";
    if (value < 60) return "#ff7f0f";
    if (value < 90) return "#ffdd57";
    if (value < 120) return "#a0e515";
    if (value < 150) return "#23cd5e";
    return "#00c2b8";
}