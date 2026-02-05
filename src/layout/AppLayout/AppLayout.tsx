import { Outlet } from 'react-router-dom'
import { CategoryList } from '../../features/categories/components/CategoryList/CategoryList'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import styles from './AppLayout.module.css'

export function AppLayout() {
  return (
    <div className={styles.pageBg}>
      <div className={styles.pageFrame}>
        <div className={styles.appShell}>
          <Header />
          <div className={styles.appBody}>
            <CategoryList />
            <main className={styles.appContent}>
              <Outlet />
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
