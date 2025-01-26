import type { ListBarTabProps } from '@/types/common'

export const MEMBER_MANAGEMENT_LIST_BAR_TAB: ListBarTabProps[] = [
  { content: '이름', width: 60 },
  { content: '아이디', width: 80 },
  { content: '부서', width: 80 },
  { content: '직무', width: 80 },
  { content: '이메일' },
  { content: '역할', width: 120 },
  { content: '승인 권한', width: 64 },
  { content: '가입일', width: 80, sortBy: 'REGISTERED' },
  { content: '처리', width: 180, justifyCenter: true }
]
