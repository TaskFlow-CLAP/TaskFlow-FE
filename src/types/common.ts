import type { Ref } from 'vue'

export interface TitleBar {
  title: string
  btn?: string
}

export interface Filter {
  title: string
  width?: number
  optionList?: string[]
  value: (Ref<string> | string) | (Ref<string[]> | string[])
}

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

export interface ListCardInfo {
  content?: string
  width?: number
  isTextXs?: boolean
  profileImg?: string
  isStatus?: boolean
}
