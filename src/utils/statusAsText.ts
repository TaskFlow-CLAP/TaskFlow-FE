import type { Status } from '@/types/common'

const text = {
  REQUESTED: '요청',
  IN_PROGRESS: '진행 중',
  IN_REVIEWING: '검토 중',
  COMPLETED: '완료',
  TERMINATED: '종료'
}

export const statusAsText = (status: Status) => {
  return text[status]
}
