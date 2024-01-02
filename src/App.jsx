import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
export function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 300)
  , [])

  function handleSubmit (event) {
    event.preventDefault()
    getMovies({ search })
  }

  function handleChange (event) {
    const newSearch = event.target.value

    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
    debouncedMovies(newSearch)
  }

  function handleSort (params) {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <h1>Buscador de peliculas</h1>
      <header>
        <form action='' onSubmit={handleSubmit}>
          <input
            style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }}
            value={search}
            onChange={handleChange}
            placeholder='Avengers, Star wars ...' name='search' id=''
          />

          <button type='submit'>Buscar</button>
          <input type='checkbox' name='' id='' onChange={handleSort} checked={sort} />

        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}

      </header>

      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}
