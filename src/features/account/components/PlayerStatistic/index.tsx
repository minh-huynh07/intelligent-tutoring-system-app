import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { PlayerStatisticProps, PlayerStats } from '@/types'
import './styles.scss'

const labelMap: Record<keyof PlayerStats, string> = {
  winrate: 'Winrate',
  kills: 'Kills',
  deaths: 'Deaths',
  assists: 'Assists',
  goldPerMin: 'Gold Per Min',
  xpPerMin: 'XP Per Min',
  heroDamage: 'Hero Damage',
  heroHealing: 'Hero Healing',
  towerDamage: 'Tower Damage',
  duration: 'Duration',
  currentRank: 'Current Rank'
}

const defaultPlayerStats: PlayerStats = {
  winrate: '',
  kills: '',
  deaths: '',
  assists: '',
  goldPerMin: '',
  xpPerMin: '',
  heroDamage: '',
  heroHealing: '',
  towerDamage: '',
  duration: '',
  currentRank: ''
}

const PlayerStatistic: React.FC<PlayerStatisticProps> = (props) => {
  const { playerStats } = props
  const stats = playerStats || defaultPlayerStats
  return (
    <div className='player-statistics'>
      <table className='player-statistics__stat-section'>
        <tbody>
          <StatItem label={labelMap['winrate']} value={stats['winrate']}  />

          <StatItem label={labelMap['kills']} value={stats['kills']}  />

          <StatItem label={labelMap['deaths']} value={stats['deaths']}  />

          <StatItem label={labelMap['assists']} value={stats['assists']}  />

          <StatItem label={labelMap['goldPerMin']} value={stats['goldPerMin']}  />

          <StatItem label={labelMap['xpPerMin']} value={stats['xpPerMin']}  />
        </tbody>
      </table>

      <table className='player-statistics__stat-section'>
        <tbody>
          <StatItem label={labelMap['heroDamage']} value={stats['heroDamage']}  />

          <StatItem label={labelMap['heroHealing']} value={stats['heroHealing']}  />

          <StatItem label={labelMap['towerDamage']} value={stats['towerDamage']}  />

          <StatItem label={labelMap['duration']} value={stats['duration']}  />

          <StatItem label={labelMap['currentRank']} value={stats['currentRank']}  />
        </tbody>
      </table>
    </div>
  )
}

type StatItemProps = {
  label: string
  value: string
  loading?: boolean
}
const StatItem: React.FC<StatItemProps> = (props) => {
  const { label, value, loading } = props
  return (
    <tr key='currentRank' className='player-statistic__stat-item'>
      <td className='player-statistics__stat-item-label'>{label}:</td>
      <td className='player-statistics__stat-item-value'>{loading ? <Skeleton width={240} /> : value}</td>
    </tr>
  )
}

export default PlayerStatistic
