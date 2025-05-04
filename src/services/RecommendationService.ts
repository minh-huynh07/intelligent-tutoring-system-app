// src/services/courseService.ts

import { GetHeroesRequest, GetHeroesResponse, GetCoursesRequest, RecommendedCoursesResponse } from '@/types'
import { HttpService } from '@/utils/httpClient'

class RecommendationService extends HttpService {
  private endpoint: string = '/api/recommendation'

  constructor() {
    super(import.meta.env.VITE_RECOMMENDATION_API_URL)
  }

  recommendedHeroes(data: GetHeroesRequest): Promise<GetHeroesResponse> {
    return this.post(`${this.endpoint}/heroes`, data)
  }

  recommendedCourses(data: GetCoursesRequest): Promise<RecommendedCoursesResponse> {
    return this.post(`${this.endpoint}/courses`, data)
  }
}

export default new RecommendationService()
