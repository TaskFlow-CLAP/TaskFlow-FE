import type { Role } from './common'

export interface MemberManagementListData {
  memberId: number
  name: string
  nickName: string
  department: string
  departmentRole: string
  email: string
  role: Role
  permission?: boolean
  registeredAt: string
}

export interface LogsListData {
  logId: number
  division: string
  createdAt: string
  nickName: string
  ipAddress: string
  status: number
  result?: string
}
export interface UserRegistrationProps {
  name: string
  email: string
  nickname: string
  isReviewer: boolean
  departmentId: string
  role: string
  departmentRole: string
}

export type RoleTypes = '관리자' | '사용자' | '담당자'

export type RoleTypesEnum = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_MANAGER'
