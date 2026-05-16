import { PillButton } from '../../../components/base/PillButton/PillButton'
import { Chip } from '../../../components/base/Chip/Chip'
import styles from '../MobileHeader.module.css'

type FilterBarProps = {
  onFilterClick?: () => void
}

export function FilterBar({ onFilterClick }: FilterBarProps) {
  return (
    <div className={styles.row3}>
      <PillButton variant="outline" onClick={onFilterClick} className={styles.filterBtn}>
        <span className="material-symbols-outlined">tune</span>
        <span>Filter</span>
      </PillButton>
      <div className={styles.chipsContainer}>
        <Chip variant="active" hasArrow>Release date</Chip>
        <Chip variant="accent">Manufacturer</Chip>
        <Chip variant="accent">Series</Chip>
        <Chip variant="accent">Price</Chip>
        <Chip variant="accent">Country</Chip>
        <Chip variant="accent">Name</Chip>
      </div>
    </div>
  )
}
