import type { Status } from '@/types/common'

const defaultColor = {
  요청: 'gray',
  '진행 중': 'blue',
  '검토 중': 'orange',
  완료: 'green',
  종료: 'red'
}

export const statusAsColor = (status: Status) => {
  return defaultColor[status]
}
