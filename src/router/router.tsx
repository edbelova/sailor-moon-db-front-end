import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../layout/AppLayout'
import { ItemCreatePage } from '../pages/ItemCreatePage'
import { ItemEditPage } from '../pages/ItemEditPage'
import { ItemViewPage } from '../pages/ItemViewPage'
import { MainPage } from '../pages/MainPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'items', element: <Navigate to="/" replace /> },
      { path: 'items/new', element: <ItemCreatePage /> },
      { path: 'items/:itemId/edit', element: <ItemEditPage /> },
      { path: 'items/:itemId', element: <ItemViewPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
