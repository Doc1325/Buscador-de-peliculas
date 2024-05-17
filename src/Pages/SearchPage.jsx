import { useEffect } from 'react'
import './styles/HomePage.css'
import './styles/SearchPage.css'
import { Movies } from '../components/Movies'
import { useMovies } from '../hooks/useMovies'
import { useParams } from 'react-router-dom'
import { NavMenu } from '../components/NavMenu'
import { Loader } from '../components/Loader'
export default function SearchPage () {
  const { search, sort } = useParams()
  const { movies, getMovies, loading } = useMovies({ search, sort })
  useEffect(() => {
    async function loadMovies () {
      getMovies({ search })// paso el objeto en si
    }
    loadMovies()
  }, [])
  return (
    <div className='homepage'>
      <NavMenu />

      <main className='searchResults'>
        {loading ? <Loader /> : <Movies movies={{ movies, type: null }} />}
      </main>
    </div>
  )
}
