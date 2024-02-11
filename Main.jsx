import { createRoot } from 'react-dom/client'
import { App } from './src/App'
import { MoviePage } from './src/Pages/MoviePage'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/hi',
        element: <h1>Hola</h1>
      }
    ]

  },
  {
    path: '/Movie/:name',
    element: <MoviePage />
  }
])
const root = createRoot(document.getElementById('app'))
root.render(
  <RouterProvider router={router} />
)
