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
  title: string
  mainCategoryName: string
  categoryName: string
  taskCode: string
  requesterTeam: string
  requesterImg: string
  requesterName: string
  status: string
}
