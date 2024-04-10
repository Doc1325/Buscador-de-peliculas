import { SearchPage } from './Pages/SearchPage'
import { MoviePage } from './Pages/MoviePage'
import { HomePage } from './Pages/HomePage'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

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
export function App () {
  
  return (
    <>
      <RouterProvider router={router} />

    </>

  )
}
