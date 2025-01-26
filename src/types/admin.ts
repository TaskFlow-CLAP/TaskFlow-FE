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
