export interface Hero {
  id: number
  name: string
  // …
}

export enum CourseType {
  ORDINARY = "ORDINARY",
  COACHING = "COACHING",
  LIVE     = "LIVE",
}

export interface Course {
  id: string
  title: string
  description?: string
  type: CourseType
  user_id?: string
  created_at?: string
  updated_at?: string
  heroes: Hero[]
}

export interface CourseList {
  results: Course[]
  count: number
}

export interface CourseCreatePayload {
  title: string
  description?: string
  type: string
  heroes: number[]
  user_id: string
}

export interface CourseUpdatePayload {
  title: string
  description: string
}
