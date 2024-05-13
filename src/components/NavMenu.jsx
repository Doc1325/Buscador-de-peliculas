import './styles/NavMenu.css'
import { Search } from './Search'
import logo from '../assets/LOGO.png'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

export function NavMenu ({ main }) {
  const [mobile, setMobile] = useState(false)
  const menuRef = useRef()
  useEffect(() => {
    function handler (e) {
      if (!menuRef.current.contains(e.target) && !document.getElementById('menu-button').contains(e.target)) {
        setMobile(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })
  function handleMobileMenu (e) {
    const newMobile = !mobile
    setMobile(newMobile)
  }
  return (
    <>
      <header className={main ? 'nav main-nav' : 'nav'} id={main ? 'main-nav' : ''}>

        <div className='vertical-menu'>
          <button onClick={handleMobileMenu} className='menu-button' id='menu-button'>
            {
  mobile ? <FontAwesomeIcon focusable={false} icon={faXmark} className='button-icon' /> : <FontAwesomeIcon target='menu-button' icon={faBars} className='button-icon' />

 }
          </button>
          <ul className={mobile === true ? 'vertical-items' : 'vertical-items hide'} ref={menuRef}>
            <li className='menu-item'>
              <Link to='/'>
                Inicio
              </Link>
            </li>
            <li className='menu-item'>

              <Link to='/movies'>
                Películas
              </Link>
            </li>
            <li className='menu-item'>
              <Link to='/tv'>
                Series
              </Link>
            </li>
          </ul>
          <Search />
        </div>
        <Link to='/' className='main-button'>
          <img src={logo} alt='' className='logo' loading='lazy' />
        </Link>

        <ul className='horizontal-menu'>

          <li className='menu-item'>
            <Link to='/movies'>
              Películas
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/tv'>
              Series
            </Link>
          </li>

          <li><Search /></li>
        </ul>

      </header>
    </>
  )
}
window.addEventListener('scroll', function () {
  const nav = document.getElementById('main-nav')
  if (!nav) return
  // Verificar si el elemento principal está fuera del rango de altura

  if (this.scrollY > 0) {
    nav.style.backgroundColor = 'var(--background-body)' //
  } else {
    nav.style.backgroundColor = '' // Restaurar el color de fondo por defecto si está dentro del rango
  }

})
