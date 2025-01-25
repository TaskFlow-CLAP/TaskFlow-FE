export interface RequestParams {
  term: number | ''
  mainCategoryId: number[]
  categoryId: number[]
  title: string
  nickName: string
  taskStatus?: string[]
  pageSize: number
  page: number
  orderRequest: { sortBy: 'REQUESTED' | 'FINISHED'; sortDirection: 'DESC' | 'ASC' }
}
