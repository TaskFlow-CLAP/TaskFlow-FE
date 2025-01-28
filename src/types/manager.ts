export interface RequestedListData {
  taskId: number
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  requesterImg: string
  requesterName: string
}

export interface RequestHistoryListData {
  taskId: number
  taskCode: string
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  requesterImg: string
  requesterName: string
  processorImg?: string
  processorName?: string
  taskStatus: string
  finishedAt?: string
}

export interface TaskCardProps {
  taskId: number
  taskCode: string
  mainCategoryName: string
  categoryName: string
  title: string
  requesterNickName: string
  requesterImageUrl: string
  requesterDepartment: string
  processorOrder: number
  taskStatus: string
  createdAt: string
}

export interface TaskCardList {
  tasksInProgress: TaskCardProps[]
  tasksPendingComplete: TaskCardProps[]
  tasksCompleted: TaskCardProps[]
  hasNext: boolean
  isFirst: boolean
  isLast: boolean
}
