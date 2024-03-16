import { createRoot } from 'react-dom/client'
import { SearchPage } from './src/Pages/SearchPage'
import { MoviePage } from './src/Pages/MoviePage'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { HomePage } from './src/Pages/HomePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage key='all' type='all' /> // las key me permiten que react identifiquen que son elementos distintos aun siendo el mismo componente

  },
  {
    path: '/movies',
    element: <HomePage key='movie' type='movie' />

  },
  {
    path: '/tv',
    element: <HomePage key='tv' type='tv' />

  },
  {
    path: '/:media/:selectedMovie',
    element: <MoviePage />
  },
  {
    path: '/search/:search/:sort?',
    element: <SearchPage />
  }

])
const root = createRoot(document.getElementById('app'))
root.render(
  <>
    <RouterProvider router={router} />
  </>
)
