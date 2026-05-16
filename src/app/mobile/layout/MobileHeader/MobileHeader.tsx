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
    <header className={styles.header}>
      {/* Row 1: Logo, Search, Profile */}
      <div className={styles.row1}>
        <Logo />
        <SearchBox />
        <AuthButton />
      </div>

      {/* Row 2: Menu & Breadcrumbs */}
      <div className={styles.row2}>
        <IconButton icon="menu" onClick={onMenuClick} />
        <Breadcrumbs />
      </div>

      {/* Row 3: Filter & Sort Chips */}
      <FilterBar onFilterClick={onFilterClick} />
    </header>
  )
}
