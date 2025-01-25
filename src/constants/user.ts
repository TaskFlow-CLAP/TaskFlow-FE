import type { TaskHistoryType } from '@/types/user'

import type { ListBarTabProps } from '@/types/common'

export const MY_REQUEST_LIST_BAR_TAB: ListBarTabProps[] = [
  { content: '고유코드', width: 120 },
  { content: '요청일', width: 80, sortBy: 'REQUESTED' },
  { content: '1차 카테고리', width: 80 },
  { content: '2차 카테고리', width: 80 },
  { content: '제목' },
  { content: '처리자', width: 120 },
  { content: '상태', width: 64 },
  { content: '종료일', width: 80, sortBy: 'FINISHED' }
]

export const REQUESTED_LIST_BAR_TAB: ListBarTabProps[] = [
  { content: '요청일', width: 80, sortBy: 'REQUESTED' },
  { content: '1차 카테고리', width: 80 },
  { content: '2차 카테고리', width: 80 },
  { content: '제목' },
  { content: '요청자', width: 120 },
  { content: '처리', width: 120, justifyCenter: true }
]

export const TITLE_PLACEHOLDER = '제목을 입력해주세요'

export const EXPLANATION_PLACEHOLDER = '부가 정보를 입력해주세요'

export const HistoryMessageBefore: Record<TaskHistoryType, string> = {
  STATUS_SWITCHED: '요청이',
  PROCESSOR_CHANGED: '처리자가',
  COMMENT: '',
  COMMENT_FILE: '',
  PROCESSOR_ASSIGNED: ''
}

export const HistoryMessageAfter: Record<TaskHistoryType, string> = {
  STATUS_SWITCHED: '상태로 변경되었습니다.',
  PROCESSOR_CHANGED: '님으로 변경되었습니다.',
  COMMENT: '',
  COMMENT_FILE: '',
  PROCESSOR_ASSIGNED: ''
}
