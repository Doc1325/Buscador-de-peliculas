import './styles/About.css'
import logo from '../assets/TMDB.svg'
import { NavMenu } from '../components/NavMenu'
export default function AboutPage (text) {
  return (
    <>
      <NavMenu />

      <main className='credit-section'>
        <h1>Creditos</h1>
        <p>
          Todos los datos relacionados a películas y series utilizados en Docsant Movies son proporcionados por <a href='https://www.themoviedb.org/' target='_blank' rel='noreferrer'>The Movie Database (TMDb).</a>
        </p>
        <p>
          Docsant Movies utiliza la API de TMDb pero no esta respalda o certificada por TMDB.
        </p>

        <a href='https://www.themoviedb.org/' target='_new'> <img src={logo} alt='' /></a>
      </main>
    </>
  )
}
