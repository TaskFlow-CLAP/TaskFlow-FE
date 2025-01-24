export interface MyRequestParams {
  term: number | ''
  mainCategoryId: number[]
  categoryId: number[]
  title: string
  nickName: string
  taskStatus: string[]
  pageSize: number
  page: number
  orderRequest: { sortBy: 'REQUESTED' | 'FINISHED'; sortDirection: 'DESC' | 'ASC' }
}

export interface RequestedParams {
  term: number | ''
  mainCategoryId: number[]
  categoryId: number[]
  title: string
  nickName: string
  pageSize: number
  page: number
  orderRequest: { sortBy: 'REQUESTED'; sortDirection: 'DESC' | 'ASC' }
}
