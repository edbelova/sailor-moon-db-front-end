import type { ItemAttributeViewProps } from "./types";

import styles from "./ItemAttributeView.module.css";


export function ItemAttributeView({ label, values }: ItemAttributeViewProps) {
    return (
        <div className={styles.row}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{Array.isArray(values) ? values.join(", ") : values}</div>
        </div>
    );
}
