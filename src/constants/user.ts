export const TERM_LIST = [
  { value: '0', content: '전체' },
  { value: '1', content: '24시간 이내' },
  { value: '7', content: '1주일 이내' },
  { value: '30', content: '1개월 이내' },
  { value: '90', content: '3개월 이내' }
]
export const TASK_STATUS_LIST = [
  { value: 'REQUESTED', content: '요청' },
  { value: 'IN_PROGRESS', content: '진행 중' },
  { value: 'IN_REVIEWING', content: '검토 중' },
  { value: 'COMPLETED', content: '완료' },
  { value: 'TERMINATED', content: '종료' }
]
export const PAGE_SIZE_LIST = [
  { value: '20', content: '20' },
  { value: '50', content: '50' },
  { value: '100', content: '100' }
]

export const MY_REQUEST_LIST_BAR_TAB: {
  content: string
  width?: number
  key?: 'requestedAt' | 'finishedAt'
}[] = [
  { content: '고유코드', width: 120 },
  { content: '요청일', width: 80, key: 'requestedAt' },
  { content: '1차 카테고리', width: 80 },
  { content: '2차 카테고리', width: 80 },
  { content: '제목' },
  { content: '처리자', width: 120 },
  { content: '상태', width: 64 },
  { content: '종료일', width: 80, key: 'finishedAt' }
]
