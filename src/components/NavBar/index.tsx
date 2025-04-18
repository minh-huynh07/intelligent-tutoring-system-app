import { useUser } from '@/contexts/UserContext'
import { Avatar, Dropdown, Menu, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaShoppingCart, FaBell, FaUserAlt } from 'react-icons/fa'
import AppLogo from '@/assets/Logo.png'
import './styles.scss'

export default function NavBar() {
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/authentication')
  }

  const handleProfile = () => {
    navigate('/my-account/stats')
  }

  const menu = (
    <Menu>
      <Menu.Item key='profile' onClick={handleProfile}>
        My Profile
      </Menu.Item>
      <Menu.Item key='logout' onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  const avatarUrl = user?.profile?.avatarfull
  const displayName = user?.profile?.personaname || 'Guest'

  return (
    <nav className='navbar'>
      {/* Left */}
      <div className='navbar__left'>
        <div className='navbar__logo'>
          <img src={AppLogo} alt='App Logo' />
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

        <Dropdown overlay={menu} placement='bottomRight'>
          <div className='navbar__avatar-wrapper'>
            <Tooltip title={displayName}>
              <Avatar size='large' src={avatarUrl || undefined} icon={!avatarUrl ? <FaUserAlt /> : undefined} />
            </Tooltip>
          </div>
        </Dropdown>
      </div>
    </nav>
  )
}
