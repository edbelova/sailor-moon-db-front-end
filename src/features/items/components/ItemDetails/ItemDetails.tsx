import { ItemAttributeView, ItemAttributeActionView } from '../ItemAttributeView'
import { defaultFilters } from '../../filters/types'
import { buildSearchFromFilters } from '../../filters/queryParams'
import styles from './ItemDetails.module.css'
import type { ItemDetailsProps } from "./types";
import { useNavigate } from 'react-router-dom'

export function ItemDetails({
    name,
    characters,
    releaseDate,
    season,
    manufacturer,
    materials,
    series,
    price,
    dimensions,
    country,
}: ItemDetailsProps) {
    const navigate = useNavigate()
    type FilterStringField =
        | 'search'
        | 'name'
        | 'characters'
        | 'releaseDateFrom'
        | 'releaseDateTo'
        | 'manufacturer'
        | 'materials'
        | 'series'
        | 'priceMin'
        | 'priceMax'
        | 'country'

    const goWithFilter = (field: FilterStringField, value: string) => {
        const search = buildSearchFromFilters({
            ...defaultFilters,
            [field]: value,
        })
        navigate({ pathname: '/', search })
    }

    return (
        <section className={styles.card} aria-label="Item details">
            <ItemAttributeView label="Name" values={name} />
            <ItemAttributeActionView label="Characters" values={characters ?? []} onAction={value => goWithFilter('characters', value)} />
            <ItemAttributeView label="Season" values={season ?? ''} />
            <ItemAttributeView label="Release Date" values={releaseDate ?? ''} />
            <ItemAttributeActionView label="Manufacturer" values={manufacturer ?? ''} onAction={value => goWithFilter('manufacturer', value)} />
            <ItemAttributeView label="Materials" values={materials ?? []} />
            <ItemAttributeActionView label="Series" values={series ?? ''} onAction={value => goWithFilter('series', value)} />
            <ItemAttributeView label="Manufacturer price" values={typeof price === "number" ? `${price}Y` : ''} />
            <ItemAttributeView label="Dimensions" values={dimensions ?? ''} />
            <ItemAttributeActionView label="Country" values={country ?? []} onAction={value => goWithFilter('country', value)} />
        </section>
    );
}
