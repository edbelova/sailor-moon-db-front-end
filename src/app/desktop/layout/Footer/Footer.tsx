import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import InstagramIcon from './InstagramIcon.svg'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.pageLinks}>
        <Link to="/support-us">Support Us</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className={styles.socialLinks}>
        <a
          href="https://instagram.com/sailormoonmuseum"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={styles.iconLink}
        >
          <img src={InstagramIcon} alt="Instagram" className={styles.icon} />
        </a>
      </div>
    </footer>
  )
}
