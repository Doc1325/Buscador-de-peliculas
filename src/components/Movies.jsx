function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {movies.map(movie => (
        <li key={movie.id} className='movie'>
          <p>{movie.title}</p>
          <p>{movie.year}</p>
          <img src={movie.image} alt={`image of ${movie.Title}`} />
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
  const hasmovies = movies?.length
  return (

    hasmovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />

  )
}
