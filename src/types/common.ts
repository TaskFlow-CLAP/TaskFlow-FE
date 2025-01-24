import type { Ref } from 'vue'

export interface TitleBarProps {
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

export interface FilterCategoryProps {
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
  currentOrderRequest?: { sortBy: string; sortDirection: 'DESC' | 'ASC' }
  justifyCenter?: boolean
}

export type Status = '요청' | '진행 중' | '검토 중' | '완료' | '종료'
