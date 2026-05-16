import { useNavigate } from 'react-router-dom'
import LogoImg from '../../../../desktop/layout/Header/Logo.png'
import styles from '../MobileHeader.module.css'

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
