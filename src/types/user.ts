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

export interface ParamsMyRequest {
  term: string
  mainCategory: number[]
  category: number[]
  title: string
  nickName: string
  taskStatus: string[]
  pageSize: string
}
