import type { Category, Role } from './common'

export interface MemberManagementListData {
  memberId: number
  name: string
  nickname: string
  departmentName: string
  departmentRole: string
  email: string
  role: Role
  isReviewer: boolean
  createdAt: string
  memberStatus: string
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
  department: DepartmentType | null
  role: RoleTypes
  departmentRole: string
  departmentId?: number
}

export interface UserInfoForAdmin extends UserRegistrationProps {
  profileImageUrl: string
  departmentName: string
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

export interface DepartmentType {
  departmentId: number
  name: string
  isManager: boolean
}

export interface UserRegistrationApiProps {
  name: string
  email: string
  nickname: string
  isReviewer: boolean
  departmentId: number
  role: RoleTypesEnum
  departmentRole: string
}

export interface UserUpdateValue {
  name: string
  isReviewer: boolean
  departmentId: number
  role: RoleTypesEnum
  departmentRole: string
}
