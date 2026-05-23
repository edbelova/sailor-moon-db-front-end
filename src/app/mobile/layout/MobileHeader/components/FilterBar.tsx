import { useLocation, useNavigate } from 'react-router-dom'
import { Header } from '@/app/mobile/components/base/Header/Header'
import { Button } from '@/shared/components/base/Button/Button'
import { SortChip } from '@/app/mobile/components/base/SortChip/SortChip'
import { parseFiltersFromSearch, buildSearchFromFilters } from '@/features/items/filters/queryParams'
import type { ItemFiltersState } from '@/features/items/filters/types'
import styles from '@/app/mobile/layout/MobileHeader/MobileHeader.module.css'

type FilterBarProps = {
  onFilterClick?: () => void
  isFiltersOpen?: boolean
}

type OrderingOption = {
  label: string
  orderBy: ItemFiltersState['orderBy']
}

const orderingOptions: OrderingOption[] = [
  { label: 'Name', orderBy: 'name' },
  { label: 'Country', orderBy: 'country' },
  { label: 'Price', orderBy: 'price' },
  { label: 'Series', orderBy: 'series' },
  { label: 'Manufacturer', orderBy: 'manufacturer' },
  { label: 'Release date', orderBy: 'releaseDate' },
]

export function FilterBar({ onFilterClick, isFiltersOpen }: FilterBarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  
  const filters = parseFiltersFromSearch(location.search)
  const usesImplicitRelevance = filters.search.trim().length > 0 && !filters.hasExplicitOrder

  const handleOrderClick = (orderBy: ItemFiltersState['orderBy']) => {
    const next: ItemFiltersState =
      filters.orderBy === orderBy
        ? {
            ...filters,
            orderDir: filters.orderDir === 'asc' ? 'desc' : 'asc',
            hasExplicitOrder: true,
          }
        : { ...filters, orderBy, orderDir: 'asc', hasExplicitOrder: true }
        
    const search = buildSearchFromFilters(next)
    navigate({ search }, { replace: true })
  }

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
        active={isFiltersOpen}
      />
      <div className={styles.chipsContainer}>
        {usesImplicitRelevance && (
          <SortChip active={false}>Relevance</SortChip>
        )}
        {orderingOptions.map((option) => {
          const isActive = !usesImplicitRelevance && filters.orderBy === option.orderBy
          
          return (
            <SortChip 
              key={option.orderBy}
              active={isActive} 
              direction={isActive ? filters.orderDir : undefined}
              onClick={() => handleOrderClick(option.orderBy)}
            >
              {option.label}
            </SortChip>
          )
        })}
      </div>
    </Header.CustomRow>
  )
}
