import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../layout/AppLayout/AppLayout'
import { ItemCreatePage } from '../pages/ItemCreatePage/ItemCreatePage'
import { ItemEditPage } from '../pages/ItemEditPage/ItemEditPage'
import { ItemViewPage } from '../pages/ItemViewPage/ItemViewPage'
import { MainPage } from '../pages/MainPage/MainPage'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'

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
