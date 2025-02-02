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

export interface CategoryLineProps {
  name?: string
  code?: string
  mainCategoryId?: string
}

export interface mainCategoryTypes {
  id: number
  name: string
  code: string
}

export interface subCategoryTypes {
  id: number
  mainCategoryId: number
  name: string
  code: string
}

export interface categoriesTypes {
  id: number
  name: string
  code: string
  subCategory: subCategoryTypes[]
}

export interface CategoryAllData {
  categories: categoriesTypes[]
}

export interface DivisionDataTypes {
  divisionId: number
  divisionName: string
  divisionColor: string
}

export interface NewDevisonTypes {
  divisionName: string
  divisionColor: string
}

export interface StatisticsData {
  key: string
  count: number
}
