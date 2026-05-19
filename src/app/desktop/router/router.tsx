import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/app/desktop/layout/AppLayout/AppLayout'
import { ItemCreatePage } from '@/app/desktop/pages/ItemCreatePage/ItemCreatePage'
import { ItemEditPage } from '@/app/desktop/pages/ItemEditPage/ItemEditPage'
import { ItemViewPage } from '@/app/desktop/pages/ItemViewPage/ItemViewPage'
import { MainPage } from '@/app/desktop/pages/MainPage/MainPage'
import { NotFoundPage } from '@/app/desktop/pages/NotFoundPage/NotFoundPage'
import { SupportUsPage } from '@/app/desktop/pages/SupportUsPage/SupportUsPage'
import { AboutPage } from '@/app/desktop/pages/AboutPage/AboutPage'
import { ContactPage } from '@/app/desktop/pages/ContactPage/ContactPage'
import { LoginPage } from '@/app/desktop/pages/LoginPage/LoginPage'
import { RequireAdmin } from '@/shared/components/RequireAdmin'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'items', element: <Navigate to="/" replace /> },
      {
        path: 'items/new',
        element: (
          <RequireAdmin>
            <ItemCreatePage />
          </RequireAdmin>
        ),
      },
      {
        path: 'items/:itemId/edit',
        element: (
          <RequireAdmin>
            <ItemEditPage />
          </RequireAdmin>
        ),
      },
      { path: ':categoryId', element: <MainPage />},
      { path: 'items/:itemId', element: <ItemViewPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'support-us', element: <SupportUsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
