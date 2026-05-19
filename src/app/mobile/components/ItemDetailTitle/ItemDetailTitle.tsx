import styles from '@/app/mobile/components/ItemDetailTitle/ItemDetailTitle.module.css'

type ItemDetailTitleProps = {
  name: string
}

export function ItemDetailTitle({ name }: ItemDetailTitleProps) {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{name}</h1>
    </section>
  )
}
