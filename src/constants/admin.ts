import type { CategoryForm, ListBarTabProps, Option } from '@/types/common'

export const MEMBER_MANAGEMENT_LIST_BAR_TAB: ListBarTabProps[] = [
  { content: '이름', width: 60 },
  { content: '아이디', width: 80 },
  { content: '부서', width: 80 },
  { content: '직무', width: 80 },
  { content: '이메일' },
  { content: '역할', width: 60 },
  { content: '승인 권한', width: 60 },
  { content: '가입일', width: 80, sortBy: 'REGISTERED_AT' },
  { content: '처리', width: 180, justifyCenter: true }
]

export const LOGIN_LOGS_DIVISION_LIST: Option[] = [
  { content: '로그인 시도', value: 'LOGIN' },
  { content: '로그아웃', value: 'LOGOUT' }
]

export const API_LOGS_DIVISION_LIST: Option[] = [
  { content: '요청 생성', value: 'REQUEST_CREATED' },
  { content: '요청 수정', value: 'REQUEST_UPDATED' },
  { content: '요청 취소', value: 'REQUEST_CANCELLED' },
  { content: '요청 승인', value: 'REQUEST_APPROVED' },
  { content: '처리자 변경', value: 'ASSIGNER_CHANGED' },
  { content: '댓글 추가', value: 'COMMENT_ADDED' },
  { content: '댓글 수정', value: 'COMMENT_UPDATED' },
  { content: '작업 상태 변경', value: 'STATUS_CHANGED' },
  { content: '작업 완료', value: 'TASK_COMPLETED' },
  { content: '작업 실패', value: 'TASK_FAILED' },
  { content: '작업 조회', value: 'TASK_VIEWED' }
]

export const LOGS_LIST_BAR_TAB: ListBarTabProps[] = [
  { content: '구분', width: 80 },
  { content: '시각', width: 180, sortBy: 'REQUESTED_AT' },
  { content: '아이디', width: 80 },
  { content: 'IP 주소', width: 120 },
  { content: 'Status', width: 40 },
  { content: '비고' }
]

import type { RoleTypes, RoleTypesEnum, UserRegistrationProps } from '@/types/admin'

export const CATEGORY_FORM: CategoryForm = {
  name: '',
  code: ''
}

export const INITIAL_USER_REGISTRATION: UserRegistrationProps = {
  name: '',
  email: '',
  nickname: '',
  isReviewer: false,
  departmentId: '',
  role: '회원의 역할을 선택해주세요',
  departmentRole: ''
}

export const RoleTypeMapping: { [key in RoleTypes]: RoleTypesEnum } = {
  사용자: 'ROLE_USER',
  담당자: 'ROLE_MANAGER',
  관리자: 'ROLE_ADMIN'
}

export const RoleKeys: RoleTypes[] = Object.keys(RoleTypeMapping) as RoleTypes[]
