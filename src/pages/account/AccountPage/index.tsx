import { useLocation, Outlet } from 'react-router'

import AccountTab from '@/features/account/components/AccountTab'
import './styles.scss'

const AccountPage = () => {
  const location = useLocation()

  return (
    <div className='account-page'>
      <h2 className='account-page__title'>My Account</h2>
      <AccountTab currentPath={location.pathname} />
      <Outlet />
    </div>
  )
}

export default AccountPage
