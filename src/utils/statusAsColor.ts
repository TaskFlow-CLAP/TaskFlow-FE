import type { Status } from '@/types/common'

const defaultColor = {
  REQUESTED: 'gray',
  IN_PROGRESS: 'blue',
  PENDING_COMPLETED: 'orange',
  COMPLETED: 'green',
  TERMINATED: 'red'
}

export const statusAsColor = (status: Status) => {
  return defaultColor[status]
}
