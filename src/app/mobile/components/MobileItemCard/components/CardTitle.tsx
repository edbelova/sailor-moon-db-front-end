import styles from '../MobileItemCard.module.css'

type CardTitleProps = {
  title: string
}

export function CardTitle({ title }: CardTitleProps) {
  return <h3 className={styles.title}>{title}</h3>
}
