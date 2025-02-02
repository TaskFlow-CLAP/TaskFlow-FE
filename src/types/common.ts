import type { Ref } from 'vue'

export interface Filter {
  title: string
  width?: string
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
  isStatusCode?: boolean
  isTextBody?: boolean
}

export interface ListBarTabProps {
  content: string
  width?: number
  sortBy?: string
  currentOrderRequest?: { sortBy: string; sortDirection: SortDirection }
  justifyCenter?: boolean
}

export type Status = '요청' | '진행 중' | '검토 중' | '완료' | '종료'

export type SortDirection = 'DESC' | 'ASC'

export type Role = 'USER' | 'MANAGER' | 'ADMIN'

export interface DueDateInputProps {
  modelValue: string
  inputType: string
}

export interface FormButtonProps {
  handleCancel: () => void
  handleSubmit: () => void
  cancelText: string
  submitText: string
}

export interface FormCheckboxProps {
  labelName?: string
  checkButtonName: string
  isChecked: boolean
}

export interface ColorSelectProps {
  labelId: number
  selectedLabelId: number | null
  isOpen: boolean
}

export interface LabelDataTypes {
  labelId: number
  labelName: string
  labelColor: string
}
