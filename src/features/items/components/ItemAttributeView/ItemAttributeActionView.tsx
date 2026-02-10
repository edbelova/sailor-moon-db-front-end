import type { ItemAttributeActionViewProps } from "./types";

import styles from "./ItemAttributeView.module.css";


export function ItemAttributeActionView({ label, values, onAction }: ItemAttributeActionViewProps) {
    const valuesAsArray = Array.isArray(values) ? values : [values];

    return (
        <div className={styles.row}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>
                {valuesAsArray.map((value, index) => (
                    <a
                        href="#"
                        key={index}
                        className={styles.filterChip}
                        onClick={(e) => {
                            e.preventDefault()
                            onAction(value)
                        }}
                    >
                        {value}
                    </a>
                ))}
            </div>
        </div>
    );
}
