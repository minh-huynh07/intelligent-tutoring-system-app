import React from 'react'

import './styles.scss'

const accountTabs = [
  { name: 'Profile', path: 'profile' },
  { name: 'Stats', path: 'stats' },
  { name: 'Account', path: 'account' },
  { name: 'Payment Methods', path: 'payment' },
  { name: 'Notifications', path: 'notification' },
  { name: 'Privacy', path: 'privacy' }
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
