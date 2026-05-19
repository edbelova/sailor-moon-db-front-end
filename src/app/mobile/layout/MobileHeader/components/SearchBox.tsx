import { PillInput } from '@/app/mobile/components/base/PillInput/PillInput'
import styles from '@/app/mobile/layout/MobileHeader/MobileHeader.module.css'

export function SearchBox() {
  return (
    <PillInput 
      icon="search"
      placeholder="Search..."
      containerClassName={styles.searchContainer}
    />
  )
}
