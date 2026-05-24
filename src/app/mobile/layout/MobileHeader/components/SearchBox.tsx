import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PillInput } from '@/app/mobile/components/base/PillInput/PillInput'
import { parseFiltersFromSearch, buildSearchFromFilters } from '@/features/items/filters/queryParams'
import styles from '@/app/mobile/layout/MobileHeader/MobileHeader.module.css'

export function SearchBox() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Get current search term from URL to use as initial state and as a key
  const queryTerm = parseFiltersFromSearch(location.search).search
  
  return (
    <SearchBoxInner 
      key={queryTerm} 
      initialTerm={queryTerm} 
      onSearch={(term) => {
        const filters = parseFiltersFromSearch(location.search)
        const next = { ...filters, search: term }
        const searchString = buildSearchFromFilters(next)
        navigate({ pathname: '/', search: searchString })
      }}
    />
  )
}

type SearchBoxInnerProps = {
  initialTerm: string
  onSearch: (term: string) => void
}

function SearchBoxInner({ initialTerm, onSearch }: SearchBoxInnerProps) {
  const [term, setTerm] = useState(initialTerm)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(term)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchContainer}>
      <PillInput 
        size="sm"
        icon="search"
        placeholder="Search..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onClear={() => {
          setTerm('')
          onSearch('')
        }}
      />
    </form>
  )
}
