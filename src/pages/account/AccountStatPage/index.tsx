/* eslint-disable @typescript-eslint/no-explicit-any */
import PlayerStatistic from '@/features/account/components/PlayerStatistic'
import HeroesMostPlayedTable from '@/features/account/components/HeroesMostPlayedTable'
import LatestMatchesTable from '@/features/account/components/LatestMatchesTable'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import './styles.scss'
import { useUser } from '@/contexts/UserContext'
import { Hero, HeroResult, PlayerStats } from '@/types'
import { sumBy } from 'lodash'
import RecommendationService from '@/services/RecommendationService'

const defaultStats: PlayerStats = {
  winrate: '0%',
  kills: '0 / 0',
  deaths: '0 / 0',
  assists: '0 / 0',
  goldPerMin: '0 / 0',
  xpPerMin: '0 / 0',
  heroDamage: '0 / 0',
  heroHealing: '0 / 0',
  towerDamage: '0 / 0',
  duration: '0:00 / 0:00',
  currentRank: 'Unranked'
}

type TotalStat = {
  field: string
  n: number
  sum: number
  avg: number
}

const LOBBY_TYPE_MAP: Record<number, string> = {
  0: 'Normal',
  1: 'Practice',
  2: 'Tournament',
  3: 'Tutorial',
  4: 'Co-op Bots',
  5: 'Ranked Team',
  6: 'Ranked Solo',
  7: 'Ranked',
  8: '1v1 Mid',
  9: 'Battle Cup'
}

const GAME_MODE_MAP: Record<number, string> = {
  1: 'All Pick',
  2: 'Captains Mode',
  3: 'Random Draft',
  4: 'Single Draft',
  5: 'All Random',
  12: 'Least Played',
  13: 'Limited Heroes',
  16: 'Captains Draft',
  18: 'Ability Draft',
  22: 'All Draft',
  23: 'Turbo',
  24: 'Mutation'
}

function computeKda(hero: any, latestMatchesData: any[]) {
  if (!latestMatchesData.length) return 0
  const heroMatches = latestMatchesData.filter((s: any) => s.hero_id === hero.hero_id)
  const killSums = sumBy(heroMatches, 'kills')
  const deathSums = sumBy(heroMatches, 'deaths')
  const assistSums = sumBy(heroMatches, 'assists')

  const kda = deathSums > 0 ? ((killSums + assistSums) / deathSums).toFixed(2) : '0.00'

  return parseFloat(kda)
}

function mapRankTier(rankTier?: number): string {
  if (!rankTier) return 'Unranked'
  const tiers = ['Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal']
  const tier = Math.floor(rankTier / 10)
  const star = rankTier % 10
  return `${tiers[tier - 1] || 'Unknown'} ${star || ''}`
}

const AccountStatPage = () => {
  const { user } = useUser()
  const account_id = user?.profile?.account_id

  const [playerStats, setPlayerStats] = useState<PlayerStats>(defaultStats)
  const [mostPlayedHeroes, setMostPlayedHeroes] = useState<Hero[]>([])
  const [latestMatches, setLatestMatches] = useState<any[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!account_id) return

    const fetchData = async () => {
      try {
        setLoading(true)

        const [totalsRes, matchesRes, heroesRes, wlRes, playerRes, heroStatsRes] = await Promise.all([
          fetch(`https://api.opendota.com/api/players/${account_id}/totals`).then((res) => res.json()),
          fetch(`https://api.opendota.com/api/players/${account_id}/matches?limit=10`).then((res) => res.json()),
          fetch(`https://api.opendota.com/api/players/${account_id}/heroes`).then((res) => res.json()),
          fetch(`https://api.opendota.com/api/players/${account_id}/wl`).then((res) => res.json()),
          fetch(`https://api.opendota.com/api/players/${account_id}`).then((res) => res.json()),
          fetch(`https://api.opendota.com/api/heroStats`).then((res) => res.json())
        ])

        // Build hero map for name + image
        const heroMap = new Map<
          number,
          { name: string; img: string; roles: string[]; laneRoles?: Record<string, number> }
        >()
        for (const h of heroStatsRes) {
          heroMap.set(h.id, {
            name: h.localized_name,
            img: `https://cdn.cloudflare.steamstatic.com${h.img}`,
            roles: h.roles || []
          })
        }

        // Helper to get stat
        const getValue = (field: string) => {
          const stat = totalsRes.find((s: TotalStat) => s.field === field)
          return stat?.sum || 0
        }

        const avgDuration = Math.floor(
          matchesRes.reduce((acc: number, match: any) => acc + (match.duration || 0), 0) / matchesRes.length
        )
        const formatDuration = (seconds: number) =>
          `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`

        // Player overview stats
        const statObj = {
          winrate: `${((wlRes.win / (wlRes.win + wlRes.lose)) * 100).toFixed(1)}%`,
          kills: `${getValue('kills')} / ${getValue('kills')}`,
          deaths: `${getValue('deaths')} / ${getValue('deaths')}`,
          assists: `${getValue('assists')} / ${getValue('assists')}`,
          goldPerMin: `${getValue('gold_per_min')} / ${getValue('gold_per_min')}`,
          xpPerMin: `${getValue('xp_per_min')} / ${getValue('xp_per_min')}`,
          heroDamage: `${(getValue('hero_damage') / 1000).toFixed(1)}K / ${(getValue('hero_damage') / 1000).toFixed(1)}K`,
          heroHealing: `${getValue('hero_healing')} / ${getValue('hero_healing')}`,
          towerDamage: `${getValue('tower_damage')} / ${getValue('tower_damage')}`,
          duration: formatDuration(avgDuration),
          currentRank: mapRankTier(playerRes.rank_tier)
        }

        setPlayerStats(statObj)

        // Build top 5 most played heroes
        const topHeroes = await Promise.all(
          heroesRes
            .filter((h: any) => h.games > 0)
            .sort((a: any, b: any) => b.games - a.games)
            .slice(0, 5)
            .map(async (hero: any) => {
              const meta = heroMap.get(hero.hero_id)

              const roleLength = meta?.roles?.length || 1
              const roleData = (meta?.roles || []).map((roleName) => ({
                roleName,
                rolePercent: Math.floor(100 / roleLength)
              }))

              // Call recommendation API for this hero
              let recommendedHeroes: HeroResult[] = []
              try {
                const res = await RecommendationService.recommendedHeroes({ heroIds: [hero.hero_id] })
                recommendedHeroes = res.results
              } catch (error) {
                console.error(`Error fetching recommended heroes for ${hero.hero_id}:`, error)
              }

              return {
                hero: meta?.name || `Hero ${hero.hero_id}`,
                heroImg: meta?.img || '',
                lastPlayed: new Date(hero.last_played * 1000).toISOString(),
                matches: hero.games,
                winPercentage: `${((hero.win / hero.games) * 100).toFixed(2)}%`,
                kda: computeKda(hero, matchesRes),
                role: roleData,
                recommendedHeroes
              }
            })
        )
        setMostPlayedHeroes(topHeroes)

        const latestMatches = matchesRes
          .sort((a: any, b: any) => b.start_time - a.start_time)
          .map((match: any) => {
            const meta = heroMap.get(match.hero_id)
            const isRadiant = match.player_slot < 128
            const win = isRadiant === match.radiant_win

            return {
              hero: meta?.name || `Hero ${match.hero_id}`,
              heroImg: meta?.img || '',
              rank: mapRankTier(playerRes.rank_tier),
              result: win ? 1 : -1, // 1 = win, -1 = lose
              playedTime: new Date(match.start_time * 1000).toISOString(),
              type: LOBBY_TYPE_MAP[match.lobby_type] || 'Unknown',
              mode: GAME_MODE_MAP[match.game_mode] || 'Unknown',
              kda: {
                kills: match.kills,
                deaths: match.deaths,
                assists: match.assists
              },
              durationSeconds: match.duration
            }
          })

        setLatestMatches(latestMatches)
      } catch (err) {
        console.error('❌ Error loading OpenDota data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [account_id])

  return (
    <Spin spinning={loading} tip='Loading player statistics...'>
      <div className='account-stat-page'>
        <PlayerStatistic playerStats={playerStats} />
        <HeroesMostPlayedTable data={mostPlayedHeroes} />
        <LatestMatchesTable data={latestMatches} />
      </div>
    </Spin>
  )
}

export default AccountStatPage
