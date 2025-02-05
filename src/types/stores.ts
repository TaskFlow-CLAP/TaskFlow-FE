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
  name: string
  nickName: string
  department: string
  email: string
  role: Role | ''
  pageSize: number
  page: number
  sortBy: 'REGISTERED_AT'
  sortDirection: SortDirection
}

export interface LogsParams {
  term: number | ''
  division: string
  nickName: string
  ipAddress: string
  pageSize: number
  page: number
  sortBy: 'CREATED_AT'
  sortDirection: SortDirection
}

export interface TeamBoardParams {
  sortBy: string
  mainCategoryIds: number[]
  categoryIds: number[]
  taskTitle: string
  valid?: boolean
}

export interface TaskBoardParams {
  labelId: number | ''
  mainCategoryIds: number[]
  categoryIds: number[]
  title: string
  requesterNickname: string
}
