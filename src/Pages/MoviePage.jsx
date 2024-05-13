import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMediaInfo } from '../services/mediaService.js'
import './styles/MoviePage.css'
import './styles/style.css'
import { Movies } from '../components/Movies'
import { Loader } from '../components/Loader'
import { NavMenu } from '../components/NavMenu'
export function MoviePage ({ type }) {
  const { selectedMovie } = useParams()
  const [movie, setMovie] = useState(null)
  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const movieInfo = await getMediaInfo({ query: selectedMovie, type })
        setMovie(movieInfo)
        window.scrollTo(0, 0)
      } catch (error) {
        console.error('Error fetching movie info:', error)
      }
    }

    fetchMovieInfo()
  }, [selectedMovie])

  if (!movie) {
    return <Loader />
  }
  return (
    <>
      <NavMenu />
      {movie.clip
        ? <iframe
            src={`https://www.youtube.com/embed/${movie.clip}?&autoplay=0`}
            allow='accelerometer; autoplay; clipboard-write;encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
            loading='lazy'
          />
        : null}
      <div className='main-content'>

        <h1>{movie.title}</h1>
        <div className='movieInfoContainer'>
          <section className='MovieInfo-left'>
            <img className='moviePoster' src={movie.image || ''} alt={`Image of ${movie.title}`} loading='lazy' />
          </section>
          <section className='MovieInfo-right'>
            <p className='primary-info'>{movie.info}</p>
            <section className='secondary-info'>
              <div className='row'>
                <p><strong>Released:</strong> {movie.releaseDate}</p>
                <p><strong>Duration:</strong> {movie.duration}</p>
              </div>
              <div className='row'>
                <div className='ranking-section'>
                  <strong>Rating:</strong>
                  {/* <img src={logo} alt='' className='ranking-img' /> */}
                  <p className='ranking-text'> {movie.ranking}  </p>
                </div>
                <p><strong>Genres:</strong> {movie.genres}</p>
              </div>
            </section>
          </section>

        </div>
        <section className='providers-section'>
          <h3>Ver en streaming</h3>
          <div className='Providers'>
            {movie.providers
              ? movie.providers.map(provider =>
                <div key={provider.providerId} className='providerContainer'>
                  {
                  provider.link
                    ? <a href={provider.link} target='_blank' rel='noreferrer'>
                      <img src={provider.providerImg} alt={provider.providerName} loading='lazy' />

                      </a>
                    : <img src={provider.providerImg} alt={provider.providerName} loading='lazy' />

                 }
                </div>
              )
              : <p>Ningun proveedor disponible en tu región 😥</p>}
          </div>
        </section>
      </div>
      <section className='similar'>
        <h2>Similares</h2>
        <Movies movies={{ movies: movie.similar, type }} />

      </section>
    </>
  )
}
