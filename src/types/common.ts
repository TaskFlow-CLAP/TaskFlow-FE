import type { Ref } from 'vue'

export interface TitleBar {
  title: string
  btn?: string
}

export interface Filter {
  title: string
  width?: number
  optionList?: Option[]
  value: (Ref<string> | string) | (Ref<string[]> | string[])
}

export interface Option {
  value: string
  content: string
}

export interface Category {
  id: number
  content: string
  subCategoryList?: { id: number; content: string }[]
}

export interface FilterCategory {
  categoryList: Category[]
  main: Ref<number[]> | number[]
  sub: Ref<number[]> | number[]
}

export interface ListCardProps {
  content?: string
  width?: number
  isTextXs?: boolean
  profileImg?: string
  isStatus?: boolean
}

export interface ListBarTabProps {
  content: string
  width?: number
  sortBy?: string
  justifyCenter?: boolean
}
