import type { Role } from './common'

export interface User {
  profileImageUrl: string
  name: string
  nickname: string
  email: string
  isReviewer: boolean
  role: Role | ''
  departmentName: string
  departmentRole: string
  notificationSettingInfo: {
    agit: boolean
    email: boolean
    kakaoWork: boolean
  }
}

export interface loginDataTypes {
  nickname: string
  password: string
}
