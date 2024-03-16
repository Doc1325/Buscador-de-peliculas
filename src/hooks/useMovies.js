import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/searchMovies.js'
export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState()
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(null)
  // en este caso el error no se usa, pero Lo hice para tener una idea de cono funcionaria un manejo de erorres con el try cathc finally
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search, type }) => {
    setLoading(true)

    try {
      const newMovies = await searchMovies({ search, type })
      previousSearch.current = search
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  , [])

  const sortedMovies = useMemo(() => { // re calculo el valor solamente cuando es necesario, es decir, cuando cambien el sort, o las peliculas mostradas
    if (movies) { // Si no hay peliculas, no hay nada que sortear, por lo tanto evito el error que daria en caso de sortear movies estando vacio
      return sort === 'true'
        ? [...movies].sort((a, b) =>
            (a.title.localeCompare(b.title)))
        : movies
    }
  }, [sort, movies])
  return { movies: sortedMovies, getMovies, loading }
}
