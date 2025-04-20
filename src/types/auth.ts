import { Course } from "./course"

export interface UserSchema {
  id: string      // UUID as a string
  name: string
  email: string
  cognito_sub: string
  role: string
}

/**
 * Corresponds to Python’s:
 * class UserToCourseSchema(UserSchema):
 *   courses: list[CourseSchema] = Field(default_factory=list)
 */
export interface UserToCourseSchema extends UserSchema {
  courses: Course[]
}


export interface SignupRequestSchema {
  name: string
  email: string
  password: string
}


export interface LoginRequestSchema {
  email: string
  password: string
}


export interface ConfirmSignupRequestSchema {
  email: string
  otp: string
}
