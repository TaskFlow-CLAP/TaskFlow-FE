import type { Category, Role } from './common'

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
  departmentId: number
  role: string
  departmentRole: string
}

export type RoleTypes = '관리자' | '사용자' | '담당자'

export type RoleTypesEnum = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_MANAGER'

export interface CategoryLineProps {
  name?: string
  code?: string
  mainCategoryId?: string
}

export interface CategoryAllData {
  categories: Category[]
}

export interface NewLabelTypes {
  labelName: string
  labelColor: string
}

export interface StatisticsData {
  key: string
  count: number
}
