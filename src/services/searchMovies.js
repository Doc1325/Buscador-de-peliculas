// import data from '../mocks/mock2.json'
// const API_KEY = 'fc04708d'
export async function searchMovies ({ search }) {
  if (search !== '') {
    try {
      const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${search}?info=mini_info&endYear=2023&startYear=1&exact=false&limit=10&titleType=movie`
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'f0e954e928msh0bd1dc6eceb7d11p19e4a5jsn5e5612867c7a',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      }

      const response = await fetch(url, options)
      const data = await response.json()
      const movies = data.results
      return movies?.map(movie => ({
        id: movie?.id ?? '',
        title: movie.originalTitleText?.text ?? '',
        year: movie.releaseYear?.year ?? '???',
        image: movie.primaryImage?.url ?? 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg',
        searchParameter: movie.id

      }))
    } catch (e) {
      throw new Error('Error searching movies' + ' ' + e)
    }
  } else {
    try {
      const url = 'https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&list=top_boxoffice_last_weekend_10'
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'f0e954e928msh0bd1dc6eceb7d11p19e4a5jsn5e5612867c7a',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      }
      const response = await fetch(url, options)
      const data = await response.json()
      const movies = data.results
      return movies?.map(movie => ({
        id: movie?.id ?? '',
        title: movie.originalTitleText?.text ?? '',
        year: movie.releaseYear?.year ?? '???',
        image: movie.primaryImage?.url ?? 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg',
        searchParameter: movie.id

      }))
    } catch (e) {
      throw new Error('Error searching movies' + ' ' + e)
    }
  }
}

export async function getMovieInfo (searchParameter) {
  const url = `https://moviesdatabase.p.rapidapi.com/titles/${searchParameter}?info=base_info`
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f0e954e928msh0bd1dc6eceb7d11p19e4a5jsn5e5612867c7a',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  }
  const response = await fetch(url, options)
  const data = await response.json()
  const movieInfo = data

  return {
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
}
