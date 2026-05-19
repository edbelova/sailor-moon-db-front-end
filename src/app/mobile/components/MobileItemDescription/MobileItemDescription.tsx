import styles from '@/app/mobile/components/MobileItemDescription/MobileItemDescription.module.css'

type MobileItemDescriptionProps = {
  description?: string
}

export function MobileItemDescription({ description }: MobileItemDescriptionProps) {
  if (!description) return null
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Item Description</h2>
      <p className={styles.text}>{description}</p>
    </section>
  )
}
