import type { Role, SortDirection } from './common'

export interface RequestParams {
  page: number
  pageSize: number
  term: number | ''
  mainCategoryIds: number[]
  categoryIds: number[]
  title: string
  nickName: string
  taskStatus?: string[]
  sortBy: 'REQUESTED_AT' | 'FINISHED_AT'
  sortDirection: SortDirection
}

export interface MemberManagementParams {
  page: number
  pageSize: number
  name: string
  email: string
  nickName: string
  departmentName: string
  role: Role | ''
  // sortBy: 'REGISTERED_AT'
  // sortDirection: SortDirection
}

export interface LogsParams {
  page: number
  pageSize: number
  term: number | ''
  logStatus: string[]
  nickName: string
  clientIp: string
  sortDirection: SortDirection
}

export interface TeamBoardParams {
  order: string
  title: string
  mainCategoryIds: number[]
  categoryIds: number[]
}

export interface TaskBoardParams {
  division: string | ''
  mainCategoryIds: number[]
  categoryIds: number[]
  title: string
  nickName: string
  pageSize: number
  page: number
}
