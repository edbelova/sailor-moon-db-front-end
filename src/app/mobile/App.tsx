import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MobileLoginPage } from './pages/LoginPage/LoginPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePlaceholder />} />
        <Route path="/login" element={<MobileLoginPage />} />
        <Route path="*" element={<HomePlaceholder />} />
      </Routes>
    </BrowserRouter>
  )
}

function HomePlaceholder() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Sailor Moon DB</h1>
      <p>Mobile Version Placeholder</p>
      <div style={{ marginTop: '40px' }}>
        <a href="/login" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>
          Go to Mobile Login
        </a>
      </div>
    </div>
  )
}
