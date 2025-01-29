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
