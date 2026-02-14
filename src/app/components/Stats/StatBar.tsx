import styles from "./Stats.module.css";
import { MAX_STATS, getStatColor } from "./stats.utils";

interface StatBarProps {
    label: string;
    value: number;
}

export function StatBar({ label, value }: StatBarProps) {
    const porcentagem = Math.min((value / MAX_STATS) * 100, 100);

    return (
        <div className={styles.stat}>
            <span className={styles.stat_name}>{label}</span>

            <div className={styles.statBar}>
                <div
                    className={styles.statFill}
                    style={{
                        width: `${porcentagem}%`,
                        backgroundColor: getStatColor(value),
                    }}
                />
            </div>

            <div className={styles.value_area}>
                <span className={styles.stat_value}>{value}</span>
            </div>
        </div>
    );
}