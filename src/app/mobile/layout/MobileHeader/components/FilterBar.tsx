import { Header } from '@/app/mobile/components/base/Header/Header'
import { PillButton, PillButtonVariant } from '@/app/mobile/components/base/PillButton/PillButton'
import { FilterButton } from '@/app/mobile/components/base/FilterButton/FilterButton'
import styles from '@/app/mobile/layout/MobileHeader/MobileHeader.module.css'

type FilterBarProps = {
  onFilterClick?: () => void
}

export function FilterBar({ onFilterClick }: FilterBarProps) {
  return (
    <Header.CustomRow className={styles.row3}>
      <PillButton variant={PillButtonVariant.OUTLINE} onClick={onFilterClick} className={styles.filterBtn}>
        <span className="material-symbols-outlined">tune</span>
        <span>Filter</span>
      </PillButton>
      <div className={styles.chipsContainer}>
        <FilterButton active hasArrow>Release date</FilterButton>
        <FilterButton>Manufacturer</FilterButton>
        <FilterButton>Series</FilterButton>
        <FilterButton>Price</FilterButton>
        <FilterButton>Country</FilterButton>
        <FilterButton>Name</FilterButton>
      </div>
    </Header.CustomRow>
  )
}
