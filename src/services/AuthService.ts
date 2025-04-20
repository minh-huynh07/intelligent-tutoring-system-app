// src/services/courseService.ts

import { LoginRequestSchema, SignupRequestSchema } from '@/types/auth'
import { HttpService } from '@/utils/httpClient'

class AuthService extends HttpService {
  private endpoint: string = '/api/auth'

  constructor() {
    super(import.meta.env.VITE_API_URL)
  }

  signUp(data: SignupRequestSchema): Promise<void> {
    return this.post(`${this.endpoint}/signup`, data)
  }

  login(data: LoginRequestSchema): Promise<void> {
    return this.post(`${this.endpoint}/login`, data)
  }
}

export default new AuthService()
