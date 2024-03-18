import React, { useEffect, useState } from 'react'
import './styles/Slideshow.css'
import { getImage } from '../services/searchMovies'

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
    <div className='slideshow-container' lazy>

      {image.length === movies?.length
        ? movies?.map((movie, index) => {
          return (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'slide fade-in' : 'slide fade-out'}`}
            >
              <img src={image[index].background} alt='' className='slide-background' />
              <section className='description'>
                <img src={image[index].logo} alt='' className='slide-logo' />
                {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus blanditiis eum ab unde, sint rem aliquam cupiditate odit distinctio. Sapiente itaque amet quaerat voluptatem, molestiae hic earum ab reiciendis iste.</p> */}
              </section>
            </div>
          )
        })
        : <p>Cargando mi galeriaz</p>}
      <button className='prev' onClick={prevSlide}>&#10094;</button>
      <button className='next' onClick={nextSlide}>&#10095;</button>
    </div>
  )
}

export default Slideshow
