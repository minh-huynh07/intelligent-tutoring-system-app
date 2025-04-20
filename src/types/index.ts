export type CourseInfo = {
  courseTitle: string
  description: string
  chapters: CourseChapter[]
}

export type CourseChapter = {
  chapterTitle: string
  lectures: CourseLecture[]
}

export type CourseLecture = {
  lectureTitle: string
  videoUrl: string
  durationSec: number
}

export interface Lecture {
  id: string;
  title: string;
  duration: number; // in seconds
  // …other fields
}

export interface UserProfile {
  account_id: number
  personaname: string
  name: string | null
  plus: boolean
  cheese: number
  steamid: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  profileurl: string
  last_login: string
  loccountrycode: string
  status: number | null
  fh_unavailable: boolean
  is_contributor: boolean
  is_subscriber: boolean
}

export interface UserInfo {
  profile: UserProfile
  rank_tier: number
  leaderboard_rank: number | null
  isAdmin?: boolean
}

export type PlayerStats = {
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

export type Role = {
  roleName: string
  rolePercent: number
}

export type Lane = {
  laneName: string
  lanePercent: number
}

export type RecommendedHero = {
  name: string
  img: string
}

export type PlayerStatisticProps = {
  playerStats: PlayerStats,
}

export type Hero = {
  hero: string
  heroImg: string
  lastPlayed: string
  matches: number
  winPercentage: string
  kda: number
  recommendedHeroes: RecommendedHero[]
  role: Role[]
  lane: Lane[]
}

export type Match = {
  hero: string
  heroImg: string
  rank: string
  result: number // 1 for won match and -1 for lost match
  playedTime: string
  type: string
  mode: string
  kda: {
    kills: number
    deaths: number
    assists: number
  }
  durationSeconds: number
}
export type HeroesMostPlayProps = {
  data: Hero[]
}

export * from './course'
