import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { Button } from '@/shared/components/base/Button/Button'
import styles from '@/app/mobile/components/AddFab/AddFab.module.css'

export function AddFab() {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()

  if (!isAdmin) return null

  return (
    <div className={styles.fabContainer}>
      <Button 
        variant="magical"
        shape="circle"
        size="lg"
        iconLeft="add"
        onClick={() => navigate('/items/new')}
        aria-label="Add new item"
      />
    </div>
  )
}
