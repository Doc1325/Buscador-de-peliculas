import { Link } from 'react-router-dom'
import './styles/Movies.css'
function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {movies.movies.map(movie => (

        <li key={movie.id} className='movie'>
          <Link to={`/${movie.type ?? movies.type}/${movie.searchParameter}`}>

            <img src={movie.image} alt={`image of ${movie.Title}`} />
            <p className='title-text'>{movie.title}</p>
            <p>{movie.year}</p>
          </Link>
        </li>)
      )}
    </ul>

  )
}

function NoMoviesResult () {
  return (
    <p>No se encuentran resultados para esta busqueda</p>
  )
}

export function Movies ({ movies }) {
  const hasmovies = movies.movies?.length
  return (

    hasmovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />

  )
}
