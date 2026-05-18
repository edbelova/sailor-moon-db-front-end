import { Header } from '../../components/base/Header/Header'
import styles from './MobileHeader.module.css'
import { AuthButton } from './components/AuthButton'
import { Breadcrumbs } from './components/Breadcrumbs'
import { FilterBar } from './components/FilterBar'
import { Logo } from './components/Logo'
import { SearchBox } from './components/SearchBox'
import { IconButton } from '../../components/base/IconButton/IconButton'

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
        <Breadcrumbs />
      </Header.CustomRow>

      {/* Row 3: Filter & Sort Chips */}
      <FilterBar onFilterClick={onFilterClick} />
    </Header>
  )
}
