import './styles.scss'

type PlayerStats = {
  winrate: string
  kills: string
  deaths: string
  assists: string
  goldPerMin: string
  xpPerMin: string
  heroDamage: string
  heroHealing: string
  towerDamage: string
  duration: string
  currentRank: string
}

type PlayerStatisticProps = {
  playerStats: PlayerStats
}

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

const PlayerStatistic: React.FC<PlayerStatisticProps> = (props) => {
  const { playerStats } = props
  return (
    <div className='player-statistics'>
      <table className='player-statistics__stat-section'>
        <tbody>
          <tr key='winrate' className='player-statistic__stat-item'>
            <td className='player-statistics__stat-item-label'>{labelMap['winrate']}:</td>
            <td className='player-statistics__stat-item-value'>{playerStats['winrate']}</td>
          </tr>

          <tr key='kills' className='player-statistic__stat-item'>
            <td className='player-statistics__stat-item-label'>{labelMap['kills']}:</td>
            <td className='player-statistics__stat-item-value'>{playerStats['kills']}</td>
          </tr>

          <tr key='deaths' className='player-statistic__stat-item'>
            <td className='player-statistics__stat-item-label'>{labelMap['deaths']}:</td>
            <td className='player-statistics__stat-item-value'>{playerStats['deaths']}</td>
          </tr>

          <tr key='assists' className='player-statistic__stat-item'>
            <td className='player-statistics__stat-item-label'>{labelMap['assists']}:</td>
            <td className='player-statistics__stat-item-value'>{playerStats['assists']}</td>
          </tr>

          <tr key='goldPerMin' className='player-statistic__stat-item'>
            <td className='player-statistics__stat-item-label'>{labelMap['goldPerMin']}:</td>
            <td className='player-statistics__stat-item-value'>{playerStats['goldPerMin']}</td>
          </tr>

          <tr key='xpPerMin' className='player-statistic__stat-item'>
            <td className='player-statistics__stat-item-label'>{labelMap['xpPerMin']}:</td>
            <td className='player-statistics__stat-item-value'>{playerStats['xpPerMin']}</td>
          </tr>
        </tbody>
      </table>

      <table className='player-statistics__stat-section'>
        <tbody>
          <tr key='heroDamage' className='player-statistic__stat-item'>
            <td className='player-statistics__stat-item-label'>{labelMap['heroDamage']}:</td>
            <td className='player-statistics__stat-item-value'>{playerStats['heroDamage']}</td>
          </tr>

          <tr key='heroHealing' className='player-statistic__stat-item'>
            <td className='player-statistics__stat-item-label'>{labelMap['heroHealing']}:</td>
            <td className='player-statistics__stat-item-value'>{playerStats['heroHealing']}</td>
          </tr>

          <tr key='towerDamage' className='player-statistic__stat-item'>
            <td className='player-statistics__stat-item-label'>{labelMap['towerDamage']}:</td>
            <td className='player-statistics__stat-item-value'>{playerStats['towerDamage']}</td>
          </tr>

          <tr key='duration' className='player-statistic__stat-item'>
            <td className='player-statistics__stat-item-label'>{labelMap['duration']}:</td>
            <td className='player-statistics__stat-item-value'>{playerStats['duration']}</td>
          </tr>

          <tr key='currentRank' className='player-statistic__stat-item'>
            <td className='player-statistics__stat-item-label'>{labelMap['currentRank']}:</td>
            <td className='player-statistics__stat-item-value'>{playerStats['currentRank']}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PlayerStatistic
