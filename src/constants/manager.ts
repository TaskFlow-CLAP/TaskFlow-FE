import type { ListBarTabProps } from '@/types/common'
import type { RequestApproveData } from '@/types/manager'

export const REQUESTED_LIST_BAR_TAB: ListBarTabProps[] = [
  { content: '요청일', width: 80, sortBy: 'REQUESTED_AT' },
  { content: '1차 카테고리', width: 80 },
  { content: '2차 카테고리', width: 80 },
  { content: '제목' },
  { content: '요청자', width: 120 },
  { content: '처리', width: 120, justifyCenter: true }
]

export const REQUEST_HISTORY_LIST_BAR_TAB: ListBarTabProps[] = [
  { content: '고유코드', width: 120 },
  { content: '요청일', width: 80, sortBy: 'REQUESTED_AT' },
  { content: '1차 카테고리', width: 80 },
  { content: '2차 카테고리', width: 80 },
  { content: '제목' },
  { content: '요청자', width: 120 },
  { content: '담당자', width: 120 },
  { content: '상태', width: 64 },
  { content: '종료일', width: 80, sortBy: 'FINISHED_AT' }
]

export const MY_TASK_LIST_BAR_TAB: ListBarTabProps[] = [
  { content: '고유코드', width: 120 },
  { content: '요청일', width: 80, sortBy: 'REQUESTED_AT' },
  { content: '1차 카테고리', width: 80 },
  { content: '2차 카테고리', width: 80 },
  { content: '제목' },
  { content: '요청자', width: 120 },
  { content: '상태', width: 64 },
  { content: '종료일', width: 80, sortBy: 'FINISHED_AT' }
]

export const INITIAL_REQUEST_APPROVE_DATA: RequestApproveData = {
  categoryId: 0,
  processor: null,
  label: null,
  dueDate: '',
  dueTime: ''
}
