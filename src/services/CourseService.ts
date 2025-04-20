// src/services/courseService.ts

import { HttpService } from '@/utils/httpClient'
import { Course, CourseList, CourseCreatePayload, CourseUpdatePayload } from '@/types/course'

class CourseService extends HttpService {
  private endpoint: string = '/api/courses/'

  constructor() {
    super(import.meta.env.VITE_API_URL)
  }

  getCourses(userId?: string): Promise<CourseList> {
    return this.get<CourseList>(this.endpoint, userId ? { params: { user_id: userId } } : undefined)
  }

  createCourse(data: CourseCreatePayload): Promise<Course> {
    return this.post<Course>(this.endpoint, data)
  }

  getByHeroes(heroIds: number[]): Promise<CourseList> {
    return this.post<CourseList>('/by-heroes', { hero_ids: heroIds })
  }

  getById(id: string): Promise<Course> {
    return this.get<Course>(`${this.endpoint}${id}`)
  }

  updateCourse(id: string, data: CourseUpdatePayload): Promise<Course> {
    return this.put<Course>(`${this.endpoint}${id}`, data)
  }

  deleteCourse(id: string): Promise<{ msg: string }> {
    return this.delete<{ msg: string }>(`${this.endpoint}/${id}`)
  }
}

export default new CourseService()
