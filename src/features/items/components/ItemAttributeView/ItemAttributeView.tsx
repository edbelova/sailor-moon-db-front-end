import type { ItemAttributeViewProps } from "@/features/items/components/ItemAttributeView/types";

import styles from "@/features/items/components/ItemAttributeView/ItemAttributeView.module.css";


export function ItemAttributeView({ label, values }: ItemAttributeViewProps) {
    return (
        <div className={styles.row}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{Array.isArray(values) ? values.join(", ") : values}</div>
        </div>
    );
}
