import { PillInput } from '../../../components/base/PillInput/PillInput'
import styles from '../MobileHeader.module.css'

export function SearchBox() {
  return (
    <PillInput 
      icon="search"
      placeholder="Search..."
      containerClassName={styles.searchContainer}
    />
  )
}
