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
