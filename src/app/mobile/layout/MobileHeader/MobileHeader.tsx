import { Header } from '@/app/mobile/components/base/Header/Header'
import styles from '@/app/mobile/layout/MobileHeader/MobileHeader.module.css'
import { AuthButton } from '@/app/mobile/layout/MobileHeader/components/AuthButton'
import { MobileBreadcrumbs } from '@/app/mobile/components/MobileBreadcrumbs/MobileBreadcrumbs'
import { FilterBar } from '@/app/mobile/layout/MobileHeader/components/FilterBar'
import { Logo } from '@/app/mobile/layout/MobileHeader/components/Logo'
import { SearchBox } from '@/app/mobile/layout/MobileHeader/components/SearchBox'
import { Button } from '@/shared/components/base/Button/Button'
import { PillInput } from '@/app/mobile/components/base/PillInput/PillInput'
import { MobileFormField } from '@/app/mobile/components/MobileFormField/MobileFormField'

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
                <PillInput size="sm" value="" onChange={() => {}} />
              </MobileFormField>
              <MobileFormField label="Series">
                <PillInput size="sm" value="" onChange={() => {}} />
              </MobileFormField>
            </div>

            <div className={styles.filterRow}>
              <MobileFormField label="Manufacturer">
                <PillInput size="sm" value="" onChange={() => {}} />
              </MobileFormField>
              <MobileFormField label="Characters">
                <PillInput size="sm" value="" onChange={() => {}} />
              </MobileFormField>
            </div>

            <div className={styles.filterRow}>
              <MobileFormField label="Country">
                <PillInput size="sm" value="" onChange={() => {}} />
              </MobileFormField>
              <MobileFormField label="Materials">
                <PillInput size="sm" value="" onChange={() => {}} />
              </MobileFormField>
            </div>

            <div className={styles.filterRow}>
              <MobileFormField label="Release Date">
                <div className={styles.rangeRow}>
                  <PillInput size="sm" placeholder="From" value="" onChange={() => {}} />
                  <span className={styles.rangeDivider}>-</span>
                  <PillInput size="sm" placeholder="To" value="" onChange={() => {}} />
                </div>
              </MobileFormField>
            </div>

            <div className={styles.filterRow}>
              <MobileFormField label="Price">
                <div className={styles.rangeRow}>
                  <PillInput size="sm" type="number" placeholder="Min" value="" onChange={() => {}} />
                  <span className={styles.rangeDivider}>-</span>
                  <PillInput size="sm" type="number" placeholder="Max" value="" onChange={() => {}} />
                </div>
              </MobileFormField>
            </div>

            <div className={styles.filterActions}>
              <Button variant="ghost" size="sm" caption="Reset" shape="pill" />
              <Button variant="surface" size="sm" caption="Apply Filters" shape="pill" />
            </div>
          </div>
        </div>
      </Header>
    </div>
  )
}
