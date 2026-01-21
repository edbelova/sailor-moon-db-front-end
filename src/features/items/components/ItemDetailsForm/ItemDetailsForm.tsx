import { useState } from 'react'
import styles from './ItemDetailsForm.module.css'

export function ItemDetailsForm() {
    const [formData, setFormData] = useState({
        name: '',
        characters: '',
        releaseDate: '',
        manufacturer: '',
        materials: '',
        series: '',
        price: '',
        dimensions: '',
        country: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <section className={styles.detailsInputBlock} aria-label="Item details input form">
            <div className={styles.row}>
                <label className={styles.label}>Name</label>
                <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Characters</label>
                <input 
                    type="text"
                    name="characters"
                    value={formData.characters}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Release Date</label>
                <input 
                    type="text"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Manufacturer</label>
                <input 
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Materials</label>
                <input 
                    type="text"
                    name="materials"
                    value={formData.materials}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Series</label>
                <input 
                    type="text"
                    name="series"
                    value={formData.series}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Manufacturer price</label>
                <input 
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Dimensions</label>
                <input 
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Country</label>
                <input 
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
        </section>
    )
}