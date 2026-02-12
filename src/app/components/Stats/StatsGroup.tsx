import styles from "./Stats.module.css";
import { StatBar } from "./StatBar";

interface StatsGroupProps {
    stats: {
        hp: number;
        atk: number;
        def: number;
        spa: number;
        spd: number;
        spe: number
    }
};

export function StatsGroup({ stats }: StatsGroupProps) {
    const total = stats.hp + stats.atk + stats.def + stats.spa + stats.spd + stats.spe;

    return (
        <section className={styles.stats}>
            <StatBar label="HP" value={stats.hp} />

            <StatBar label="ATK" value={stats.atk} />

            <StatBar label="DEF" value={stats.def} />

            <StatBar label="SPA" value={stats.spa} />

            <StatBar label="SPD" value={stats.spd} />
            
            <StatBar label="SPE" value={stats.spe} />

            <p className={styles.total}>TOTAL: {total}</p>
        </section>
    )
}