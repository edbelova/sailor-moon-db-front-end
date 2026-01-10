import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { CategoryList } from './CategoryList'

export function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <CategoryList />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
