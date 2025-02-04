import type { Role } from './common'

export interface MemberManagementListData {
  memberId: number
  name: string
  nickname: string
  departmentName: string
  departmentRole: string
  email: string
  role: Role
  isReviewer: boolean
  registeredAt: string
}

export interface LoginLogsListData {
  logId: number
  logStatus: string
  requestAt: string
  nickName: string
  clientIp: string
  statusCode: number
  customStatusCode: string
  failedAttempts: number
}

export interface ApiLogsListData {
  logId: number
  logStatus: string
  requestAt: string
  nickName: string
  clientIp: string
  statusCode: number
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

export interface MemberManagementResponse {
  content: MemberManagementListData[]
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: boolean
  isLast: boolean
}

export interface LoginLogsResponse {
  content: LoginLogsListData[]
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: boolean
  isLast: boolean
}

export interface ApiLogsResponse {
  content: ApiLogsListData[]
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: boolean
  isLast: boolean
}
