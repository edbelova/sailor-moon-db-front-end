import { ItemAttributeView, ItemAttributeActionView } from '../ItemAttributeView'
import styles from './ItemDetails.module.css'
import type { ItemDetailsProps } from "./types";

export function ItemDetails({
    name,
    characters,
    releaseDate,
    manufacturer,
    materials,
    series,
    price,
    dimensions,
    country,
}: ItemDetailsProps) {
    return (
        <section className={styles.card} aria-label="Item details">
            <ItemAttributeView label="Name" values={name} />
            <ItemAttributeActionView label="Characters" values={characters ?? []} onAction={value => { alert(value + ' clicked! Change me later'); }} />
            <ItemAttributeView label="Release Date" values={releaseDate ?? ''} />
            <ItemAttributeView label="Manufacturer" values={manufacturer ?? ''} />
            <ItemAttributeView label="Materials" values={materials ?? []} />
            <ItemAttributeView label="Series" values={series ?? ''} />
            <ItemAttributeView label="Manufacturer price" values={typeof price === "number" ? `${price}Y` : ''} />
            <ItemAttributeView label="Dimensions" values={dimensions ?? ''} />
            <ItemAttributeActionView label="Country" values={country ?? []} onAction={value => { alert(value + ' clicked! Change me later'); }} />
        </section>
    );
}