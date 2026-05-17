import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../features/auth/useAuth'
import styles from './AddFab.module.css'

export function AddFab() {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()

  if (!isAdmin) return null

  return (
    <button 
      className={styles.fab} 
      onClick={() => navigate('/items/new')}
      aria-label="Add new item"
    >
      <span className="material-symbols-outlined">add</span>
    </button>
  )
}
