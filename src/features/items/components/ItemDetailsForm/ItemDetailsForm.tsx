import styles from './ItemDetailsForm.module.css'
import { ReleaseDateInput } from '../ReleaseDateInput/ReleaseDateInput'
import { useItemFormStore } from '../../state/useItemFormStore'

export function ItemDetailsForm() {
    const values = useItemFormStore((state) => state.values)
    const setField = useItemFormStore((state) => state.setField)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setField(name as keyof typeof values, value)
    }

    return (
        <section className={styles.detailsInputBlock} aria-label="Item details input form">
            <div className={styles.row}>
                <label className={styles.label}>Name</label>
                <input 
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Characters</label>
                <input 
                    type="text"
                    name="characters"
                    value={values.characters}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Season</label>
                <input 
                    type="text"
                    name="season"
                    value={values.season}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Release Date</label>
                <ReleaseDateInput
                    value={values.releaseDate}
                    onChange={(nextValue) => setField('releaseDate', nextValue)}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Manufacturer</label>
                <input 
                    type="text"
                    name="manufacturer"
                    value={values.manufacturer}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Materials</label>
                <input 
                    type="text"
                    name="materials"
                    value={values.materials}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Series</label>
                <input 
                    type="text"
                    name="series"
                    value={values.series}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Manufacturer price</label>
                <input 
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Dimensions</label>
                <input 
                    type="text"
                    name="dimensions"
                    value={values.dimensions}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Country</label>
                <input 
                    type="text"
                    name="countryOfOrigin"
                    value={values.countryOfOrigin}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
        </section>
    )
}
