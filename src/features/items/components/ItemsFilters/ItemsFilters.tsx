import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './ItemsFilters.module.css'
import { defaultFilters, type ItemFiltersState } from '../../filters/types'
import { buildSearchFromFilters, parseFiltersFromSearch } from '../../filters/queryParams'
import { useItemFilterOptions } from '../../queries/useItemFilterOptions'
import Filter from './Filter.svg'

// Filter panel used on both main and category pages.
export function ItemsFilters() {
    const location = useLocation()
    return <ItemsFiltersInner key={location.search} locationSearch={location.search} />
}

type ItemsFiltersInnerProps = {
    locationSearch: string
}

function ItemsFiltersInner({ locationSearch }: ItemsFiltersInnerProps) {
    // Autosuggest data for Characters/Manufacturer/Series/Materials/Country.
    const { data } = useItemFilterOptions()
    const characters = data?.characters ?? []
    const manufacturers = data?.manufacturers ?? []
    const series = data?.series ?? []
    const materials = data?.materials ?? []
    const countries = data?.countries ?? []

    // URL access for writing updated query params.
    const navigate = useNavigate()

    // Local UI state: panel open/closed and current input values.
    const [isOpen, setIsOpen] = useState(false)
    const [filters, setFilters] = useState<ItemFiltersState>(() =>
        parseFiltersFromSearch(locationSearch)
    )

    // Update one field while keeping inputs controlled.
    const updateField = (key: keyof ItemFiltersState, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    // Apply button updates the URL, which triggers refetch via query key.
    const handleApply = () => {
        const search = buildSearchFromFilters(filters)
        navigate({ search }, { replace: true })
    }

    const handleReset = () => {
        setFilters(defaultFilters)
        navigate({ search: '' }, { replace: true })
    }

    const renderOptions = (values: string[]) =>
        values.map((value) => (
            <option key={value} value={value} />
        ))

    type OrderingOption = {
        label: string
        orderBy: ItemFiltersState['orderBy']
        orderDir?: ItemFiltersState['orderDir']
    }

    const orderingOptions: OrderingOption[] = [
        { label: 'Recently added', orderBy: 'releaseDate', orderDir: 'desc' },
        { label: 'Release date', orderBy: 'releaseDate' },
        { label: 'Manufacturer', orderBy: 'manufacturer' },
        { label: 'Series', orderBy: 'series' },
        { label: 'Name', orderBy: 'name' },
        { label: 'Price', orderBy: 'price' },
        { label: 'Country', orderBy: 'country' },
    ]

    const applyFilters = (nextFilters: ItemFiltersState) => {
        const search = buildSearchFromFilters(nextFilters)
        navigate({ search }, { replace: true })
    }

    const handleOrderClick = (
        orderBy: ItemFiltersState['orderBy'],
        orderDir?: ItemFiltersState['orderDir'],
    ) => {
        setFilters((prev) => {
            const next: ItemFiltersState =
                prev.orderBy === orderBy
                    ? { ...prev, orderDir: prev.orderDir === 'asc' ? 'desc' : 'asc' }
                    : { ...prev, orderBy, orderDir: orderDir ?? 'asc' }
            applyFilters(next)
            return next
        })
    }

    return (
        <section className={styles.filtersSection}>
            <div className={styles.toolbar}>
                <div className={styles.ordering}>
                    {orderingOptions.map((option) => {
                        const isActive = filters.orderBy === option.orderBy
                        const showDir = isActive
                        return (
                            <button
                                key={`${option.label}-${option.orderBy}`}
                                type="button"
                                className={isActive ? styles.orderingActive : styles.orderingButton}
                                onClick={() => handleOrderClick(option.orderBy, option.orderDir)}
                            >
                                {option.label}
                                {showDir && (
                                    <span className={styles.orderingCaret} aria-hidden="true">
                                        <span
                                            className={
                                                filters.orderDir === 'asc'
                                                    ? styles.orderingIconAsc
                                                    : styles.orderingIconDesc
                                            }
                                        />
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
                <button type="button" onClick={() => setIsOpen((open) => !open)} className={styles.filterToggle}>
                    Filter
                    <img src={Filter} alt="" aria-hidden="true" className={styles.filterIcon} />
                </button>
            </div>

            {isOpen && (
                <div className={styles.panel}>
                    <div className={styles.row}>
                        <label>Name</label>
                        <input
                            type="text"
                            value={filters.name}
                            onChange={(e) => updateField('name', e.target.value)}
                        />
                    </div>

                    <div className={styles.row}>
                        <label>Materials</label>
                        <input
                            type="text"
                            value={filters.materials}
                            onChange={(e) => updateField('materials', e.target.value)}
                            placeholder="Type values, separated by commas"
                            list="materials-options"
                        />
                        <datalist id="materials-options">{renderOptions(materials)}</datalist>
                    </div>

                    <div className={styles.row}>
                        <label>Characters</label>
                        <input
                            type="text"
                            value={filters.characters}
                            onChange={(e) => updateField('characters', e.target.value)}
                            placeholder="Type values, separated by commas"
                            list="characters-options"
                        />
                        <datalist id="characters-options">{renderOptions(characters)}</datalist>
                    </div>

                    <div className={styles.row}>
                        <label>Series</label>
                        <input
                            type="text"
                            value={filters.series}
                            onChange={(e) => updateField('series', e.target.value)}
                            placeholder="Type values, separated by commas"
                            list="series-options"
                        />
                        <datalist id="series-options">{renderOptions(series)}</datalist>
                    </div>

                    <div className={styles.row}>
                        <label>Release date</label>
                        <div className={styles.rangeRow}>
                            <input
                                type="text"
                                value={filters.releaseDateFrom}
                                onChange={(e) => updateField('releaseDateFrom', e.target.value)}
                                placeholder="YYYY-MM-DD"
                                className={styles.rangeInput}
                            />
                            <span className={styles.rangeDivider}>-</span>
                            <input
                                type="text"
                                value={filters.releaseDateTo}
                                onChange={(e) => updateField('releaseDateTo', e.target.value)}
                                placeholder="YYYY-MM-DD"
                                className={styles.rangeInput}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <label>Price</label>
                        <div className={styles.rangeRow}>
                            <input
                                type="number"
                                value={filters.priceMin}
                                onChange={(e) => updateField('priceMin', e.target.value)}
                                placeholder="Min"
                                className={styles.rangeInput}
                            />
                            <span className={styles.rangeDivider}>-</span>
                            <input
                                type="number"
                                value={filters.priceMax}
                                onChange={(e) => updateField('priceMax', e.target.value)}
                                placeholder="Max"
                                className={styles.rangeInput}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <label>Manufacturer</label>
                        <input
                            type="text"
                            value={filters.manufacturer}
                            onChange={(e) => updateField('manufacturer', e.target.value)}
                            placeholder="Type values, separated by commas"
                            list="manufacturer-options"
                        />
                        <datalist id="manufacturer-options">{renderOptions(manufacturers)}</datalist>
                    </div>

                    <div className={styles.row}>
                        <label>Country</label>
                        <input
                            type="text"
                            value={filters.country}
                            onChange={(e) => updateField('country', e.target.value)}
                            placeholder="Type values, separated by commas"
                            list="country-options"
                        />
                        <datalist id="country-options">{renderOptions(countries)}</datalist>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" onClick={handleReset} className={styles.resetButton}>
                            Reset
                        </button>
                        <button type="button" onClick={handleApply} className={styles.applyButton}>
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}
