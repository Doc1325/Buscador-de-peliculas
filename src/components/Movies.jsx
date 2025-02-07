import poster from '../assets/default_poster.png'
import { Loader } from './Loader'
import { Link } from 'react-router-dom'
import './styles/Movies.css'
function ListOfMovies ({ movies, loading }) {
  return (
    <ul className='movies'>
      {movies.movies.map(movie => (

        <li key={movie.type + ' #' + movie.id} className='movie'>
          <Link to={`/${movie.type ?? movies.type}/${movie.searchParameter}`}>

            <img src={movie.image} alt={`Imagen de ${movie.title}`} loading='lazy' />
            <p className='title-text'>{movie.title}</p>
            <p>{movie.year}</p>
          </Link>
        </li>)
      )}
      {loading ? <SkeletonMovies /> : null}
    </ul>

  )
}

function SkeletonMovies () {
  const skeletonMovieList = []
  for (let index = 0; index < 10; index++) {
    skeletonMovieList.push(
      <li key={index} className='movie skeleton'>

        <img src={poster} alt='image of ' loading='lazy' />
        <p className='title-text-skeleton' />
        <p className='year-skeleton' />

      </li>)
  }
  return (skeletonMovieList)
}

function NoMoviesResult (loading) {
  return (
    <>
      {loading == true
        ? <Loader> </Loader>
        : <p>No se encuentran resultados para esta busqueda</p>}
    </>

  )
}

export function Movies ({ movies, loading }) {
  const hasmovies = movies.movies?.length
  return (
    
    hasmovies ? <ListOfMovies movies={movies} loading={loading} /> : <NoMoviesResult loading={loading} />

  )
}
