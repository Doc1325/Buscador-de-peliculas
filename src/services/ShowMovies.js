export async function searchMovies ({ search }) {
  try {
    const url = 'https://moviesdatabase.p.rapidapi.com/titles?year=2020&sort=year.incr'
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
      id: movie.id,
      title: movie.originalTitleText.text,
      year: movie.releaseYear.year,
      image: movie.primaryImage?.url ?? 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'

    }))
  } catch (e) {
    throw new Error('Error searching movies' + ' ' + e)
  }
}
