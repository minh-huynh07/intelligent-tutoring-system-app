import { FaShoppingCart, FaBell, FaSearch } from 'react-icons/fa'

import AppLogo from '@/assets/Logo.png'
import './styles.scss'

export default function NavBar() {
  return (
    <nav className='navbar'>
      {/* Left */}
      <div className='navbar__left'>
        <div className='navbar__logo'>
          <img src={AppLogo} alt='User Avatar' className='' />
        </div>
      </div>

      {/* Center */}
      <div className='navbar__search'>
        <input type='text' placeholder='Search for course' />
        <FaSearch className='search-icon' />
      </div>

      {/* Right */}
      <div className='navbar__right'>
        <span className='navbar__link'>Become Instructor</span>
        <FaShoppingCart className='navbar__icon' />
        <FaBell className='navbar__icon' />
        <img src='' alt='User Avatar' className='navbar__avatar' />
      </div>
    </nav>
  )
}
