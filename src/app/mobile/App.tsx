import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MobileLoginPage } from './pages/LoginPage/LoginPage'
import { MobileMainPage } from './pages/MainPage/MainPage'
import { MobileItemViewPage } from './pages/ItemViewPage/ItemViewPage'
import { MobileItemFormPage } from './pages/ItemFormPage/ItemFormPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileMainPage />} />
        <Route path="/:categoryId" element={<MobileMainPage />} />
        <Route path="/login" element={<MobileLoginPage />} />
        <Route path="/items/new" element={<MobileItemFormPage />} />
        <Route path="/items/:itemId/edit" element={<MobileItemFormPage />} />
        <Route path="/items/:itemId" element={<MobileItemViewPage />} />
        <Route path="*" element={<MobileMainPage />} />
      </Routes>
    </BrowserRouter>
  )
}
