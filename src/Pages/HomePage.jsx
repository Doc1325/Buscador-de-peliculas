import { useEffect } from 'react'
import './styles/HomePage.css'
import { Movies } from '../components/Movies'
import { useMovies } from '../hooks/useMovies'
import Slideshow from '../components/Gallery'
import { NavMenu } from '../components/NavMenu'
import { Loader } from '../components/Loader'
export function HomePage ({ type }) {
  window.scrollTo(0, 0)

  const { movies, getMovies, loading } = useMovies({ search: '', sort: false })
  useEffect(() => {
    getMovies({ search: '', type })// paso el objeto en si
  }, [])

  const title = {
    tv: 'series',
    movie: 'Peliculas'

  }

  return (
    <div className='homepage'>
      <NavMenu />

      <h1 className='page-title'>{title[type]}</h1>
      {!loading
        ? <Slideshow movies={movies?.slice(0, 5)} />
        : null}

      <main>
        {loading ? <Loader /> : <Movies movies={{ movies, type: null }} />}
      </main>
    </div>
  )
}
