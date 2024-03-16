import './styles/NavMenu.css'
import { Search } from './Search'
import logo from '../assets/LOGO.png'
import { Link } from 'react-router-dom'

export function NavMenu () {
  return (
    <>
      <header>

        <Link to='/'>
          <img src={logo} alt='' className='logo' />
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

          <li className='menu-item'>
            <a href='http://'>Coming soon</a>
          </li>
          <li><Search /></li>
        </ul>
      </header>
    </>
  )
}
