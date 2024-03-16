import { useEffect } from 'react'
import './styles/HomePage.css'
import { Movies } from '../components/Movies'
import { useMovies } from '../hooks/useMovies'
import Slideshow from '../components/Gallery'
import { NavMenu } from '../components/NavMenu'
export function HomePage ({ type }) {
  const { movies, getMovies, loading } = useMovies({ search: '', sort: false })
  useEffect(() => {
    getMovies({ search: '', type })// paso el objeto en si
  }, [])

  return (
    <div className='homepage'>
      <NavMenu />

      {!loading
        ? <Slideshow movies={movies?.slice(0, 5)} />
        : null}
      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={{ movies, type: null }} />}
      </main>
    </div>
  )
}
