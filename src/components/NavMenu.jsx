import './styles/NavMenu.css'
import { Search } from './Search'
import logo from '../assets/LOGO.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
export function NavMenu () {
  const [mobile, setMobile] = useState(false)

  function handleMobileMenu () {
    const newMobile = !mobile
    setMobile(newMobile)
  }
  return (
    <>
      <header>

        <div className='vertical-menu'>
          <button onClick={handleMobileMenu} className='menu-button'>
            {
  mobile ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />

 }
          </button>
          <ul className={mobile === true ? 'vertical-items' : 'vertical-items hide'}>
            <li className='menu-item'>
              <Link to='/movies'>
                Movies
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
        <Link to='/'>
          <img src={logo} alt='' className='logo' loading='lazy' />
        </Link>

        <ul className='horizontal-menu'>

          <li className='menu-item'>
            <Link to='/movies'>
              Movies
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
