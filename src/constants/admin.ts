import type { Role, RoleTypes, UserRegistrationProps } from '@/types/admin'

export const INITIAL_USER_REGISTRATION: UserRegistrationProps = {
  name: '',
  email: '',
  nickname: '',
  isReviewer: false,
  departmentId: '',
  role: '회원의 역할을 선택해주세요',
  departmentRole: ''
}

export const RoleTypeMapping: { [key in Role]: RoleTypes } = {
  사용자: 'ROLE_USER',
  담당자: 'ROLE_MANAGER',
  관리자: 'ROLE_ADMIN'
}

export const RoleKeys: Role[] = Object.keys(RoleTypeMapping) as Role[]
