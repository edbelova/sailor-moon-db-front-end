import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Header } from '@/app/mobile/components/base/Header/Header'
import styles from '@/app/mobile/layout/MobileHeader/MobileHeader.module.css'
import { AuthButton } from '@/app/mobile/layout/MobileHeader/components/AuthButton'
import { MobileBreadcrumbs } from '@/app/mobile/components/MobileBreadcrumbs/MobileBreadcrumbs'
import { FilterBar } from '@/app/mobile/layout/MobileHeader/components/FilterBar'
import { Logo } from '@/app/mobile/layout/MobileHeader/components/Logo'
import { SearchBox } from '@/app/mobile/layout/MobileHeader/components/SearchBox'
import { Button } from '@/shared/components/base/Button/Button'
import { PillInput } from '@/app/mobile/components/base/PillInput/PillInput'
import { PillCombobox } from '@/app/mobile/components/base/PillCombobox/PillCombobox'
import { MobileFormField } from '@/app/mobile/components/MobileFormField/MobileFormField'
import { useItemFilterOptions } from '@/features/items/queries/useItemFilterOptions'
import { buildSearchFromFilters, parseFiltersFromSearch } from '@/features/items/filters/queryParams'
import { defaultFilters, type ItemFiltersState } from '@/features/items/filters/types'

type MobileHeaderProps = {
  onMenuClick?: () => void
  onFilterClick?: () => void
  isFiltersOpen?: boolean
}

export function MobileHeader({ 
  onMenuClick, 
  onFilterClick, 
  isFiltersOpen = false,
}: MobileHeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { data: options } = useItemFilterOptions()

  // Source of truth from the URL
  const urlFilters = useMemo(() => 
    parseFiltersFromSearch(location.search), 
    [location.search]
  )

  // Local overrides for the filter panel while it's being edited
  const [localFilters, setLocalFilters] = useState<Partial<ItemFiltersState>>({})

  // Merged filters for the UI
  const filters = { ...urlFilters, ...localFilters }

  const updateField = (key: keyof ItemFiltersState, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleApply = () => {
    const search = buildSearchFromFilters(filters)
    navigate({ search }, { replace: true })
    
    // Use a small delay to clear overrides. 
    // This ensures the URL update is processed by the router before we wipe the local draft.
    setTimeout(() => {
      setLocalFilters({})
    }, 0)
    
    onFilterClick?.() // Close the panel
  }

  const handleReset = () => {
    // Preserve search and sorting, reset only the specific attribute filters
    const next: ItemFiltersState = {
      ...defaultFilters,
      search: urlFilters.search,
      orderBy: urlFilters.orderBy,
      orderDir: urlFilters.orderDir,
      hasExplicitOrder: urlFilters.hasExplicitOrder,
    }
    const search = buildSearchFromFilters(next)
    navigate({ search }, { replace: true })
    
    setTimeout(() => {
      setLocalFilters({})
    }, 0)
    
    onFilterClick?.() // Close the panel
  }

  return (
    <div className={styles.headerWrapper}>
      <Header>
        {/* Row 1: Logo, Search, Profile */}
        <Header.StandardRow
          left={<Logo />}
          center={<div className={styles.searchContainer}><SearchBox /></div>}
          right={<AuthButton />}
        />

        {/* Row 2: Menu & Breadcrumbs */}
        <Header.CustomRow>
          <Button 
            variant="ghost" 
            shape="circle" 
            size="sm" 
            iconLeft="menu" 
            onClick={onMenuClick} 
            className={styles.menuBtn}
          />
          <MobileBreadcrumbs />
        </Header.CustomRow>

        {/* Row 3: Filter & Sort Chips */}
        <FilterBar onFilterClick={onFilterClick} isFiltersOpen={isFiltersOpen} />

        {/* Expandable Filter Panel */}
        <div className={`${styles.expandedFilters} ${isFiltersOpen ? styles.expandedFiltersOpen : ''}`}>
          <div className={styles.expandedFiltersInner}>
            <div className={styles.filterRow}>
              <MobileFormField label="Name">
                <PillInput 
                  size="sm" 
                  value={filters.name} 
                  onChange={(e) => updateField('name', e.target.value)} 
                  onClear={() => updateField('name', '')}
                  onEnter={handleApply}
                />
              </MobileFormField>
              <MobileFormField label="Series">
                <PillCombobox 
                  size="sm" 
                  value={filters.series} 
                  onChange={(val) => updateField('series', val)} 
                  options={options?.series}
                  onEnter={handleApply}
                />
              </MobileFormField>
            </div>

            <div className={styles.filterRow}>
              <MobileFormField label="Manufacturer">
                <PillCombobox 
                  size="sm" 
                  value={filters.manufacturer} 
                  onChange={(val) => updateField('manufacturer', val)} 
                  options={options?.manufacturers}
                  onEnter={handleApply}
                />
              </MobileFormField>
              <MobileFormField label="Characters">
                <PillCombobox 
                  size="sm" 
                  value={filters.characters} 
                  onChange={(val) => updateField('characters', val)} 
                  options={options?.characters}
                  onEnter={handleApply}
                />
              </MobileFormField>
            </div>

            <div className={styles.filterRow}>
              <MobileFormField label="Country">
                <PillCombobox 
                  size="sm" 
                  value={filters.country} 
                  onChange={(val) => updateField('country', val)} 
                  options={options?.countries}
                  onEnter={handleApply}
                />
              </MobileFormField>
              <MobileFormField label="Materials">
                <PillCombobox 
                  size="sm" 
                  value={filters.materials} 
                  onChange={(val) => updateField('materials', val)} 
                  options={options?.materials}
                  onEnter={handleApply}
                />
              </MobileFormField>
            </div>

            <div className={styles.filterRow}>
              <MobileFormField label="Release Date">
                <div className={styles.rangeRow}>
                  <PillInput 
                    size="sm" 
                    placeholder="From" 
                    value={filters.releaseDateFrom} 
                    onChange={(e) => updateField('releaseDateFrom', e.target.value)} 
                    onClear={() => updateField('releaseDateFrom', '')}
                    onEnter={handleApply}
                  />
                  <span className={styles.rangeDivider}>-</span>
                  <PillInput 
                    size="sm" 
                    placeholder="To" 
                    value={filters.releaseDateTo} 
                    onChange={(e) => updateField('releaseDateTo', e.target.value)} 
                    onClear={() => updateField('releaseDateTo', '')}
                    onEnter={handleApply}
                  />
                </div>
              </MobileFormField>
            </div>

            <div className={styles.filterRow}>
              <MobileFormField label="Price">
                <div className={styles.rangeRow}>
                  <PillInput 
                    size="sm" 
                    type="number" 
                    placeholder="Min" 
                    value={filters.priceMin} 
                    onChange={(e) => updateField('priceMin', e.target.value)} 
                    onClear={() => updateField('priceMin', '')}
                    onEnter={handleApply}
                  />
                  <span className={styles.rangeDivider}>-</span>
                  <PillInput 
                    size="sm" 
                    type="number" 
                    placeholder="Max" 
                    value={filters.priceMax} 
                    onChange={(e) => updateField('priceMax', e.target.value)} 
                    onClear={() => updateField('priceMax', '')}
                    onEnter={handleApply}
                  />
                </div>
              </MobileFormField>
            </div>

            <div className={styles.filterActions}>
              <Button 
                variant="ghost" 
                size="sm" 
                caption="Reset" 
                shape="pill" 
                onClick={handleReset}
              />
              <Button 
                variant="surface" 
                size="sm" 
                caption="Apply Filters" 
                shape="pill" 
                onClick={handleApply}
              />
            </div>
          </div>
        </div>
      </Header>
    </div>
  )
}
