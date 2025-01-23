export interface MyRequestParams {
  term: number
  mainCategory: number[]
  category: number[]
  title: string
  nickName: string
  taskStatus: string[]
  pageSize: number
}

export interface MyRequestListInfo {
  taskId: number
  taskCode: string
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  processorImg?: string
  processorName?: string
  taskStatus: string
  finishedAt?: string
}
