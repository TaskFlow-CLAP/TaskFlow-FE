import type { Role, SortDirection } from './common'

export interface RequestParams {
  page: number
  pageSize: number
  filterTaskListRequest: {
    term: number | ''
    mainCategoryIds: number[]
    categoryIds: number[]
    title: string
    nickName: string
    taskStatus?: string[]
    sortBy: 'REQUESTED' | 'FINISHED'
    sortDirection: SortDirection
  }
}

export interface MemberManagementParams {
  name: string
  nickName: string
  department: string
  email: string
  role: Role | ''
  pageSize: number
  page: number
  sortBy: 'REGISTERED'
  sortDirection: SortDirection
}

export interface LogsParams {
  term: number | ''
  division: string
  nickName: string
  ipAddress: string
  pageSize: number
  page: number
  sortBy: 'CREATED'
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
