export interface UserRegistrationProps {
  name: string
  email: string
  nickname: string
  isReviewer: boolean
  departmentId: string
  role: string
  departmentRole: string
}

export type Role = '관리자' | '사용자' | '담당자'

export type RoleTypes = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_MANAGER'
