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
  name: string
  code: string
  subCategory?: SubCategory[]
}

export interface SubCategory {
  id: number
  mainCategoryId: number
  name: string
  code: string
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

export type Status = 'REQUESTED' | 'IN_PROGRESS' | 'PENDING_COMPLETED' | 'COMPLETED' | 'TERMINATED'

export type SortDirection = 'DESC' | 'ASC'

export type Role = 'ROLE_USER' | 'ROLE_MANAGER' | 'ROLE_ADMIN'

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
  isOpen: boolean
  newLabel: LabelDataTypes
}

export interface CategoryForm {
  name: string
  code: string
  mainCategoryId?: number
}

export interface CategoryDropdownProps {
  options: Category[] | SubCategory[]
  labelName: string
  modelValue: Category | SubCategory | null
  isLabel?: boolean
  isDisabled?: boolean
  isInvalidate?: string
}

export interface LabelDataTypes {
  labelId?: number
  labelName: string
  labelColor: string
}

export interface LabelColorTypes {
  borderColor: string
  fillColor: string
  colorEnum: string
}

export interface TaskStatusListTypes {
  value: Status
  content: string
}
