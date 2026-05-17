import styles from './ItemDetailTitle.module.css'

type ItemDetailTitleProps = {
  name: string
  categoryPath: string
}

export function ItemDetailTitle({ name, categoryPath }: ItemDetailTitleProps) {
  return (
    <section className={styles.container}>
      <nav className={styles.categoryPath}>{categoryPath}</nav>
      <h1 className={styles.title}>{name}</h1>
    </section>
  )
}
