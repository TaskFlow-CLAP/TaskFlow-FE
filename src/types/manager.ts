export interface RequestedListData {
  taskId: number
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  requesterImg?: string
  requesterName?: string
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
