import type { ListBarTabProps } from '@/types/common'
import type { RequestApproveFormData } from '@/types/manager'

export const REQUESTED_LIST_BAR_TAB: ListBarTabProps[] = [
  { content: '요청일', width: 80, sortBy: 'REQUESTED' },
  { content: '1차 카테고리', width: 80 },
  { content: '2차 카테고리', width: 80 },
  { content: '제목' },
  { content: '요청자', width: 120 },
  { content: '처리', width: 120, justifyCenter: true }
]

export const REQUEST_HISTORY_LIST_BAR_TAB: ListBarTabProps[] = [
  { content: '고유코드', width: 120 },
  { content: '요청일', width: 80, sortBy: 'REQUESTED' },
  { content: '1차 카테고리', width: 80 },
  { content: '2차 카테고리', width: 80 },
  { content: '제목' },
  { content: '요청자', width: 120 },
  { content: '처리자', width: 120 },
  { content: '상태', width: 64 },
  { content: '종료일', width: 80, sortBy: 'FINISHED' }
]

export const MY_TASK_LIST_BAR_TAB: ListBarTabProps[] = [
  { content: '고유코드', width: 120 },
  { content: '요청일', width: 80, sortBy: 'REQUESTED' },
  { content: '1차 카테고리', width: 80 },
  { content: '2차 카테고리', width: 80 },
  { content: '제목' },
  { content: '요청자', width: 120 },
  { content: '상태', width: 64 },
  { content: '종료일', width: 80, sortBy: 'FINISHED' }
]

export const INITIAL_REQUEST_APPROVE_FORM: RequestApproveFormData = {
  category1: '1차 카테고리를 선택해주세요',
  category2: '2차 카테고리를 선택해주세요',
  processor: '담당자를 선택해주세요',
  labeling: '구분을 선택해주세요',
  dueDate: '',
  dueTime: ''
}
