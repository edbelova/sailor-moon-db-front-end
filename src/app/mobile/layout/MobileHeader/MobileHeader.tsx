import { Header } from '@/app/mobile/components/base/Header/Header'
import styles from '@/app/mobile/layout/MobileHeader/MobileHeader.module.css'
import { AuthButton } from '@/app/mobile/layout/MobileHeader/components/AuthButton'
import { MobileBreadcrumbs } from '@/app/mobile/components/MobileBreadcrumbs/MobileBreadcrumbs'
import { FilterBar } from '@/app/mobile/layout/MobileHeader/components/FilterBar'
import { Logo } from '@/app/mobile/layout/MobileHeader/components/Logo'
import { SearchBox } from '@/app/mobile/layout/MobileHeader/components/SearchBox'
import { IconButton } from '@/app/mobile/components/base/IconButton/IconButton'

type MobileHeaderProps = {
  onMenuClick?: () => void
  onFilterClick?: () => void
}

export function MobileHeader({ onMenuClick, onFilterClick }: MobileHeaderProps) {
  return (
    <Header>
      {/* Row 1: Logo, Search, Profile */}
      <Header.StandardRow
        left={<Logo />}
        center={<div className={styles.searchContainer}><SearchBox /></div>}
        right={<AuthButton />}
      />

      {/* Row 2: Menu & Breadcrumbs */}
      <Header.CustomRow>
        <IconButton icon="menu" onClick={onMenuClick} />
        <MobileBreadcrumbs />
      </Header.CustomRow>

      {/* Row 3: Filter & Sort Chips */}
      <FilterBar onFilterClick={onFilterClick} />
    </Header>
  )
}
