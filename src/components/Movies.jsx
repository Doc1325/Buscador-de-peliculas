import { getMovieInfo } from '../services/searchMovies'
import { Outlet, Link } from 'react-router-dom'

function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {movies.map(movie => (
        <li key={movie.id} className='movie' onClick={() => handleMovie(movie.searchParameter)}>
          <Link to={`/Movie/${movie.title}`}>
            <p className='title-text'>{movie.title}</p>
            <p>{movie.year}</p>
            <img src={movie.image} alt={`image of ${movie.Title}`} />
          </Link>
        </li>)
      )}
    </ul>

  )
}

export async function handleMovie (searchParameter) {
  console.log((await getMovieInfo(searchParameter)).duration)
}

function NoMoviesResult () {
  return (
    <p>No se encuentran resultados para esta busqueda</p>
  )
}

export function Movies ({ movies }) {
  const hasmovies = movies?.length
  return (

    hasmovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />

  )
}
