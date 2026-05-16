import { PillButton, PillButtonVariant } from '../../../components/base/PillButton/PillButton'
import { Chip, ChipVariant } from '../../../components/base/Chip/Chip'
import styles from '../MobileHeader.module.css'

type FilterBarProps = {
  onFilterClick?: () => void
}

export function FilterBar({ onFilterClick }: FilterBarProps) {
  return (
    <div className={styles.row3}>
      <PillButton variant={PillButtonVariant.OUTLINE} onClick={onFilterClick} className={styles.filterBtn}>
        <span className="material-symbols-outlined">tune</span>
        <span>Filter</span>
      </PillButton>
      <div className={styles.chipsContainer}>
        <Chip variant={ChipVariant.ACTIVE} hasArrow>Release date</Chip>
        <Chip variant={ChipVariant.ACCENT}>Manufacturer</Chip>
        <Chip variant={ChipVariant.ACCENT}>Series</Chip>
        <Chip variant={ChipVariant.ACCENT}>Price</Chip>
        <Chip variant={ChipVariant.ACCENT}>Country</Chip>
        <Chip variant={ChipVariant.ACCENT}>Name</Chip>
      </div>
    </div>
  )
}
