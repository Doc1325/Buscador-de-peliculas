import Links from '../Mocks/Links.json' assert {type:'json'}
// let Links
// LoadLink()

// async function LoadLink () {
//   const dataLink = await fetch('/src/Mocks/Links.json')
//   Links = await dataLink.json()
// }

const API = import.meta.env.VITE_TMDB_API_TOKEN
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API}`
  }
}
// navigator.language
const END_POINTS = {
  search: (search) => `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=es-DO&page=1`,
  info: (query, type) => `https://api.themoviedb.org/3/${type}/${query}?language=es-DO&append_to_response=videos,similar,watch/providers`, // respuestas extra se colocan con  coma
  general: 'https://api.themoviedb.org/3/trending/all/day?&language=es-DO&append_to_response=images',
  movies: 'https://api.themoviedb.org/3/trending/movie/day?&language=es-DO&append_to_response=images',
  tv: 'https://api.themoviedb.org/3/trending/tv/day?&language=es-DO&append_to_response=images',
  images: (query, type) => `https://api.themoviedb.org/3/${type}/${query}/images`
}

export async function searchMovies ({ search, type }) {
// Carga el contenido del archivo .env
  let response
  if (search !== '' && search !== undefined) {
    try {
      response = await fetch(END_POINTS.search(search), options)
    } catch (e) {
      throw new Error('Error searching movies' + ' ' + e)
    }
  } else {
    if (type === 'tv') response = await fetch(END_POINTS.tv, options)
    else if (type === 'movie') response = await fetch(END_POINTS.movies, options)
    else response = await fetch(END_POINTS.general, options)
  }

  const data = await response.json()
  const movies = await data.results
  return mapMovies(movies)
}

export async function getMovieInfo (searchParameter) {
  const response = await fetch(END_POINTS.info(searchParameter.query, searchParameter.type), options)
  const data = await response.json()
  const movieInfo = await data
  return {
    title: movieInfo?.title ?? movieInfo?.name,
    info: movieInfo?.overview,
    image: `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}` ?? `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`, // TODO: ADD DEFAULT MOVIE POSTER
    ranking: Number(movieInfo.vote_average.toFixed(1)),
    genres: movieInfo.genres[0].name,
    releaseDate: movieInfo.release_date ?? movieInfo.first_air_date,
    duration: timeConvert(movieInfo.runtime ?? movieInfo.episode_run_time),
    clip: movieInfo?.videos?.results[0]?.key ?? null,
    similar: mapMovies(movieInfo.similar.results.slice(0, 8)),
    providers: mapProviders(movieInfo['watch/providers'].results.DO)

  }
}

function mapProviders (providers) {
  const flatrateProviders = providers?.flatrate
  const freeProviders = providers?.free
  const buyProviders = providers?.buy

  const flatrateProviderList = flatrateProviders
    ? flatrateProviders.map(provider => {
      return {
        providerId: provider.provider_id,
        providerName: provider.provider_name,
        providerImg: `https://image.tmdb.org/t/p/w500/${provider.logo_path}`,
        link: Links[provider.provider_name] ?? ''
      }
    })
    : []

  const freeProviderList = freeProviders
    ? freeProviders.map(provider => {
      return {
        providerId: provider.provider_id,
        providerName: provider.provider_name,
        providerImg: `https://image.tmdb.org/t/p/w500/${provider.logo_path}`,
        link: Links[provider.provider_name] ?? ''
      }
    })
    : []
  const buyProviderList = buyProviders
    ? buyProviders.map(provider => {
      return {
        providerId: provider.provider_id,
        providerName: provider.provider_name,
        providerImg: `https://image.tmdb.org/t/p/w500/${provider.logo_path}`,
        link: Links[provider.provider_name] ?? ''
      }
    })
    : []

  const allProviders = new Set([...flatrateProviderList, ...freeProviderList, ...buyProviderList])
  const mappedProviders = [...allProviders]
  return mappedProviders.length !== 0 ? mappedProviders : null
}

function mapMovies (movies) {
  return movies?.map(movie => ({
    id: movie?.id ?? '',
    title: movie?.title ?? movie?.name ?? '',
    year: movie?.release_date?.substring(0, 4) ?? movie.first_air_date?.substring(0, 4),
    image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` ?? 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg',
    searchParameter: movie?.id,
    type: movie?.media_type
  }))
}

// export async function getGeneral () {
//   const response = await fetch(END_POINTS.general)
//   const data = await response.json()
//   const movies = data.results
//   return movies?.map(movie => ({
//     id: movie?.id ?? '',
//     title: movie?.title ?? movie?.name,
//     year: movie?.release_date ?? '???',
//     image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` ?? 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg',
//     searchParameter: movie?.id,
//     type: movie?.media_type
//   }))
// }

function timeConvert (n) {
  const num = n
  const hours = (num / 60)
  const rhours = Math.floor(hours)
  const minutes = (hours - rhours) * 60
  const rminutes = Math.round(minutes)
  return rhours > 0 ? rhours + 'h' + ' ' + rminutes + 'm' : rminutes + 'm'
}

export async function getImage (media) {
  const response = await fetch(END_POINTS.images(media.query, media.type), options)
  const data = await response.json()
  const background = await data?.backdrops[0].file_path ?? ''
  const logo = await data?.logos[0].file_path ?? ''

  return { background: `https://image.tmdb.org/t/p/original/${background}`, logo: `https://image.tmdb.org/t/p/original/${logo}` }
}

// export function extractProviders (params) {
//   Providers.results.forEach(element => {
//     console.log(element.provider_name)
//   })}
