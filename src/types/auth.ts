import type { Role } from './common'

export interface User {
<<<<<<< HEAD
  profileImageUrl: string
  name: string
  nicknanme: string
  email: string
  isReviewer: boolean
  role: Role | ''
=======
  memberName: string
  nickname: string
  email: string
  imageUrl: string
  memberRole: string
  memberStatus: string
>>>>>>> 615ff90b0bdfb8300b5dbd0cb7ef89cbe6052cf4
  departmentName: string
  departmentRole: string
}

export interface loginDataTypes {
  nickname: string
  password: string
}
