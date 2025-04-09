import AccountTab from '@/features/account/components/AccountTab'
import PlayerStatistic from '@/features/account/components/PlayerStatistic'
import HeroesMostPlayedTable from '@/features/account/components/HeroesMostPlayedTable'

const statistic = {
  winrate: '50%',
  kills: 'Text',
  deaths: '9 / 16',
  assists: '19 / 37',
  goldPerMin: '333 / 411',
  xpPerMin: '512 / 683',
  heroDamage: '9.9K / 13.9K',
  heroHealing: 'Text',
  towerDamage: '171 / 636',
  duration: '35:08 / 47:05',
  currentRank: 'Cursader'
}

const AccountPage = () => {
  return (
    <div>
      <h2>My Account</h2>
      <AccountTab />
      <PlayerStatistic playerStats={statistic} />
      <HeroesMostPlayedTable />
    </div>
  )
}

export default AccountPage
