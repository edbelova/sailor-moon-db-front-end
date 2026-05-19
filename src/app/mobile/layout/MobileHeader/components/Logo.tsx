import { useNavigate } from 'react-router-dom'
import LogoImg from '@/app/desktop/layout/Header/Logo.png'
import styles from '@/app/mobile/layout/MobileHeader/MobileHeader.module.css'

export function Logo() {
  const navigate = useNavigate()
  return (
    <img 
      src={LogoImg} 
      alt="Museum Logo" 
      className={styles.logo} 
      onClick={() => navigate('/')} 
    />
  )
}
