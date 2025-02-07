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
  sortDirection: SortDirection
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
  sortBy: string
  mainCategoryIds: number[]
  categoryIds: number[]
  taskTitle: string
}

export interface TaskBoardParams {
  labelId: number | ''
  mainCategoryIds: number[]
  categoryIds: number[]
  title: string
  requesterNickname: string
}
