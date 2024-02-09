import './styles/NavMenu.css'
import logo from '../assets/LOGO.png'
export function NavMenu () {
  return (
    <>
      <header>
        <a href='home'>     <img src={logo} alt='' className='logo' />
        </a>
        <ul className='horizontal-menu'>

          <li className='menu-item'>
            Movies
          </li>
          <li className='menu-item'>
            Series

          </li>
          <li className='menu-item'>
            <a href='http://'>Coming soon</a>
          </li>
        </ul>
      </header>
    </>
  )
}
