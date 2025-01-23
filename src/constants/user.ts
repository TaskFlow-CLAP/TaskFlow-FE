export const TERM_LIST = ['전체', '24시간 이내', '1주일 이내', '1개월 이내', '3개월 이내']
export const TASK_STATUS_LIST = ['요청', '진행 중', '검토 중', '완료', '종료']
export const PAGE_SIZE_LIST = ['20', '50', '100']

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
