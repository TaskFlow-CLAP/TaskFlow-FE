import type { Role, SortDirection } from './common'

export interface RequestParams {
  term: number | ''
  mainCategoryId: number[]
  categoryId: number[]
  title: string
  nickName: string
  taskStatus?: string[]
  pageSize: number
  page: number
  orderRequest: { sortBy: 'REQUESTED' | 'FINISHED'; sortDirection: SortDirection }
}

export interface MemberManagementParams {
  name: string
  nickName: string
  department: string
  email: string
  role: Role | ''
  pageSize: number
  page: number
  orderRequest: { sortBy: 'REGISTERED'; sortDirection: SortDirection }
}

export interface LogsParams {
  term: number | ''
  division: string
  nickName: string
  ipAddress: string
  pageSize: number
  page: number
  orderRequest: { sortBy: 'CREATED'; sortDirection: SortDirection }
}

export interface TeamBoardParams {
  order: string
  title: string
  mainCategoryId: number[]
  categoryId: number[]
}

export interface TaskBoardParams {
  division: string | ''
  mainCategoryId: number[]
  categoryId: number[]
  title: string
  nickName: string
  pageSize: number
  page: number
}
