import type { Role } from './common'

export interface User {
  profileImageUrl: string
  name: string
  nicknanme: string
  email: string
  isReviewer: boolean
  role: Role | ''
  departmentName: string
  departmentRole: string
}

export interface loginDataTypes {
  nickname: string
  password: string
}
