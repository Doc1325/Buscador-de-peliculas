import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './default.css'

const About = lazy(() => import('./Pages/About'))
const HomePage = lazy(() => import('./Pages/HomePage'))
const MoviePage = lazy(() => import('./Pages/MoviePage'))
const SearchPage = lazy(() => import('./Pages/SearchPage'))
import '/src/Pages/styles/style.css'

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
    path: '/tv/:selectedMovie',
    element: <MoviePage key='tv' type='tv' />
  },
  {
    path: '/movie/:selectedMovie',
    element: <MoviePage key='movie' type='movie' />
  },
  {
    path: '/search/:search/:sort?',
    element: <SearchPage />
  },
  {
    path: '/about',
    element: <About />
  }

])
export function App () {
  return (
    <>
      <Suspense>
        <RouterProvider router={router} />

      </Suspense>
    </>

  )
}
