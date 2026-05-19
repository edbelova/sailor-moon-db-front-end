import { Header } from '@/app/mobile/components/base/Header/Header'
import { Button } from '@/shared/components/base/Button/Button'
import { FilterButton } from '@/app/mobile/components/base/FilterButton/FilterButton'
import styles from '@/app/mobile/layout/MobileHeader/MobileHeader.module.css'

type FilterBarProps = {
  onFilterClick?: () => void
}

export function FilterBar({ onFilterClick }: FilterBarProps) {
  return (
    <Header.CustomRow className={styles.row3}>
      <Button 
        variant="surface" 
        shape="pill" 
        size="sm" 
        onClick={onFilterClick} 
        className={styles.filterBtn}
        iconLeft="tune"
        caption="Filter"
      />
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
