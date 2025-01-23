import type { Ref } from 'vue'

export interface Category {
  value: number
  content: string
  subCategoryList?: { value: number; content: string }[]
}

export interface FilterCategory {
  categoryList: Category[]
  main: Ref<number[]> | number[]
  sub: Ref<number[]> | number[]
}
