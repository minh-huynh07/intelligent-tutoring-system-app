import React from 'react'

import './styles.scss'

const accountTabs = [
  { name: 'Profile', path: '/my-account/profile' },
  { name: 'Stats', path: '/my-account/stats' },
  { name: 'Account', path: '/my-account/account' },
  { name: 'Payment Methods', path: '/my-account/payment' },
  { name: 'Notifications', path: '/my-account/notification' },
  { name: 'Privacy', path: '/my-account/privacy' }
]

type AccountTabProps = {
  currentPath: string
}

const AccountTab: React.FC<AccountTabProps> = (props) => {
  const { currentPath } = props
  return (
    <div className='account-tab'>
      {accountTabs.map((i) => (
        <AccountTabItem name={i.name} path={i.path} active={currentPath === i.path} />
      ))}
    </div>
  )
}

type AccountTabItemProps = {
  name: string
  path: string
  active: boolean
}

const AccountTabItem: React.FC<AccountTabItemProps> = (props) => {
  const { name, active } = props
  return <div className={`account-tab__item ${active ? 'active' : ''}`}>{name}</div>
}

export default AccountTab
