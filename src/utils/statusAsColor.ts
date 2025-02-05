import type { Status } from '@/types/common'

const defaultColor = {
  REQUESTED: 'gray',
  IN_PROGRESS: 'blue',
  IN_REVIEWING: 'orange',
  COMPLETED: 'green',
  TERMINATED: 'red'
}

export const statusAsColor = (status: Status) => {
  return defaultColor[status]
}
