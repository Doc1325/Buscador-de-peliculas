import movieInfo from '../mocks/mockinfo.json'
import './styles/MoviePage.css'
import logo from '../assets/IMDB_Logo.svg'
export function MoviePage (selectedMovie) {
  const movie = {
    title: movieInfo.results.titleText.text,
    info: movieInfo.results.plot.plotText.plainText,
    image: movieInfo.results.primaryImage.url,
    ranking: movieInfo.results.ratingsSummary.aggregateRating,
    genres: movieInfo.results.genres.genres,
    releaseDate: () => {
      const day = movieInfo.results.releaseDate.day
      const month = movieInfo.results.releaseDate.month
      const year = movieInfo.results.releaseDate.year
      return [day, month, year].join('-')
    },
    duration: movieInfo.results.runtime.displayableProperty.value.plainText

  }

  return (
    <>
      <div className='movieInfoContainer'>
        <section className='MovieInfo-left'>
          <img className='moviePoster' src={movie.image} alt='' />

        </section>
        <section className='MovieInfo-right'>
          <h1 className='movieTitle'>{movie.title}</h1>

          <p className='primary-info'>{movie.info}</p>

          <section className='secondary-info'>
            <div className='row'>
              <p><strong>Released:</strong> {movie.releaseDate()}</p>
              <p><strong>Duration:</strong>  {movie.duration}</p>
            </div>
            <div className='row'>
              <p><strong>Genres:</strong>  {movie.genres.map(genre => ' ' + genre.text).join(',')}.</p>
              <div className='ranking-section'>
                <strong>Rating:</strong>
                <img src={logo} alt='' className='ranking-img' />
                <p className='ranking-text'> {movie.ranking}</p>
              </div>
            </div>

          </section>

          {/* <ul className='gender-list'>
            {movie.genres.map(genre => <li key={genre.id} className='gender'>{genre.text}</li>)}
          </ul> */}

        </section>

      </div>
      <iframe width='800' height='500' src='https://www.youtube.com/embed/hebWYacbdvc?&autoplay=0' title='The Flash – Official Trailer' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen />
    </>
  )
}
