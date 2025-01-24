import type { Status } from './common'

export interface MyRequestParams {
  term: number
  mainCategory: number[]
  category: number[]
  title: string
  nickName: string
  taskStatus: Status[]
  pageSize: number
  pageNumber: number
  order: { target: string; type: 'DESC' | 'ASC' }
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
  taskStatus: Status
  finishedAt?: string
}
export interface RequestTaskDropdownProps {
  placeholderText: string
  options: string[]
  labelName: string
  modelValue: string
}

export interface RequestTaskInputProps {
  modelValue: string
  placeholderText: string
}

export interface RequestTaskFileInputProps {
  files: File[] | null
  removeFile: (index: number) => void
}

export interface RequestTaskTextAreaProps {
  modelValue: string
  placeholderText: string
}
