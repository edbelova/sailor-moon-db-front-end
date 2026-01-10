import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { SideNav } from './SideNav'

export function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <SideNav />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
