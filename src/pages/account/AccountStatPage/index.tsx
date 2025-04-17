import { useEffect, useState } from 'react'

import PlayerStatistic from '@/features/account/components/PlayerStatistic'
import HeroesMostPlayedTable from '@/features/account/components/HeroesMostPlayedTable'
import LatestMatchesTable from '@/features/account/components/LatestMatchesTable'
import { Hero, Match, PlayerStats } from '@/types'
import './styles.scss'

const statistic: PlayerStats = {
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

const mostPlayedHeroesData: Hero[] = [
  {
    hero: 'Oracle',
    heroImg:
      'https://images.unsplash.com/photo-1655824251467-d25618d53767?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastPlayed: '2025-04-09T05:00:00.000Z',
    matches: 768,
    winPercentage: '55.60%',
    kda: 3.47,
    role: [{ roleName: 'Support', rolePercent: 100 }],
    lane: [{ laneName: 'Safe Lane', lanePercent: 100 }],
    recommendedHeroes: [
      {
        name: 'Pangolier',
        img: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/pangolier.png'
      },
      {
        name: 'Omniknight',
        img: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/omniknight.png'
      }
    ]
  },
  {
    hero: 'Asd',
    heroImg:
      'https://images.unsplash.com/photo-1655824251467-d25618d53767?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastPlayed: '2025-04-09T05:00:00.000Z',
    matches: 100,
    winPercentage: '55.60%',
    kda: 1.2,
    role: [{ roleName: 'Support', rolePercent: 100 }],
    lane: [{ laneName: 'Safe Lane', lanePercent: 100 }],
    recommendedHeroes: [
      {
        name: 'Phoenix',
        img: 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/phoenix.png'
      }
    ]
  }
]

const latestMatchesData = [
  {
    hero: 'Oracle',
    heroImg: '',
    rank: 'Ancient V',
    result: 1,
    playedTime: '2025-04-10T05:00:00.000Z',
    type: 'Normal',
    mode: 'All Pick',
    kda: { kills: 7, deaths: 11, assists: 18 },
    durationSeconds: 2908
  },
  {
    hero: 'Oracle',
    heroImg: '',
    rank: 'Ancient I',
    result: -1,
    playedTime: '2025-04-09T16:00:00.000Z',
    type: 'Normal',
    mode: 'All Pick',
    kda: { kills: 1, deaths: 12, assists: 8 },
    durationSeconds: 1792
  },
  {
    hero: 'Oracle',
    heroImg: '',
    rank: 'Ancient V',
    result: 1,
    playedTime: '2025-04-08T10:00:00.000Z',
    type: 'Normal',
    mode: 'All Pick',
    kda: { kills: 8, deaths: 2, assists: 3 },
    durationSeconds: 1799
  },
  {
    hero: 'Oracle',
    heroImg: '',
    rank: 'Ancient I',
    result: -1,
    playedTime: '2025-04-07T06:00:00.000Z',
    type: 'Normal',
    mode: 'All Pick',
    kda: { kills: 6, deaths: 12, assists: 26 },
    durationSeconds: 4186
  },
  {
    hero: 'Disruptor',
    heroImg: '',
    rank: 'Legend V',
    result: -1,
    playedTime: '2025-03-10T14:00:00.000Z',
    type: 'Normal',
    mode: 'All Pick',
    kda: { kills: 2, deaths: 11, assists: 16 },
    durationSeconds: 2257
  },
  {
    hero: 'Disruptor',
    heroImg: '',
    rank: 'Divine I',
    result: 1,
    playedTime: '2025-03-08T10:00:00.000Z',
    type: 'Normal',
    mode: 'All Pick',
    kda: { kills: 5, deaths: 4, assists: 14 },
    durationSeconds: 1750
  }
]

const AccountStatPage = () => {
  const [statsData, setStatsData] = useState<PlayerStats | null>(null)
  const [loadingStatsData, setLoadingStatsData] = useState<boolean>(true)
  const [mostPlayedHeroes, setMostPlayedHeroes] = useState<Hero[]>([])
  const [loadingMostPlayedHeroes, setLoadingMostPlayedHeroes] = useState<boolean>(true)
  const [latestMatches, setLatestMatches] = useState<Match[]>([])
  const [loadingLatestMatches, setLoadingLatestMatches] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setStatsData(statistic)
        setLoadingStatsData(false)

        setMostPlayedHeroes(mostPlayedHeroesData)
        setLoadingMostPlayedHeroes(false)

        setLatestMatches(latestMatchesData)
        setLoadingLatestMatches(false)
      }, 3000)
    }
    fetchData()
  })

  return (
    <div className='account-stat-page'>
      <PlayerStatistic playerStats={statsData} loading={loadingStatsData} />
      <HeroesMostPlayedTable data={mostPlayedHeroes} loading={loadingMostPlayedHeroes} />
      <LatestMatchesTable data={latestMatches} loading={loadingLatestMatches} />
    </div>
  )
}

export default AccountStatPage
