import React, { useEffect, useState } from 'react'
import './styles/Slideshow.css'
import '../default.css'
import { getImage } from '../services/mediaService.js'
import { Loader } from './Loader'
import { Link } from 'react-router-dom'
function Slideshow ({ movies }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [image, setImage] = useState([])
  useEffect(() => {
    const fetchMovieImage = async () => {
      try {
        const promises = movies.map(async (movie) => {
          const movieInfo = await getImage({ query: movie.id, type: movie.type })
          return movieInfo
        })

        const movieInfos = await Promise.all(promises)
        setImage(movieInfos)
      } catch (error) {
        console.error('Error fetching movie info:', error)
      }
    }

    if (movies) fetchMovieImage()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === movies.length - 1 ? 0 : prevSlide + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? movies.length - 1 : prevSlide - 1))
  }

  return (
    <div className='slideshow-container' id='gallery'>

      {image.length === movies?.length
        ? movies?.map((movie, index) => {
          return (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'slide fade-in' : 'slide fade-out'}`}
            >
              <img src={image[index].background} alt='' className='slide-background' />
              <section className='description'>
                <img src={image[index].logo} alt='' className='slide-logo' loading='lazy' />
                <ul className='genre-list'>
                  {movie.genres.map((genre, index) => (
                    <li key={index} className='genre-item'>{genre}</li>
                  ))}
                </ul>

              </section>
              <Link to={`/${movie.type ?? movies.type}/${movie.searchParameter}`} className='more-btn'>
                Mas información
              </Link>
            </div>
          )
        })
        : <Loader />}
      <button className='prev' onClick={prevSlide}>&#10094;</button>
      <button className='next' onClick={nextSlide}>&#10095;</button>
    </div>
  )
}

export default Slideshow
