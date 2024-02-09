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
        image: movie.primaryImage?.url ?? 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'

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
        image: movie.primaryImage?.url ?? 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'

      }))
    } catch (e) {
      throw new Error('Error searching movies' + ' ' + e)
    }
  }
}

export async function getMovieInfo () {

}
