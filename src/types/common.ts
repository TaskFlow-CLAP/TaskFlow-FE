import type { Ref } from 'vue'
import type { TaskHistory } from './user'

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
  mainCategoryId: number
  name: string
  code: string
  subCategory?: SubCategory[]
}

export interface SubCategory {
  subCategoryId: number
  mainCategoryId: number
  name: string
  code: string
  descriptionExample: string
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

export type Status = 'REQUESTED' | 'IN_PROGRESS' | 'IN_REVIEWING' | 'COMPLETED' | 'TERMINATED'

export type SortDirection = 'DESC' | 'ASC'

export type Role = 'ROLE_USER' | 'ROLE_MANAGER' | 'ROLE_ADMIN'

export interface DueDateInputProps {
  modelValue: string | null
  inputType: string
  isInvalidate?: string
}

export interface FormButtonProps {
  handleCancel: () => void
  handleSubmit: () => void
  cancelText: string
  submitText: string
}

export interface FormCheckboxProps {
  checkButtonName: string
  isChecked: boolean
  labelName?: string
  isDisabled?: boolean
}

export interface ColorSelectProps {
  isOpen: boolean
}

export interface CategoryForm {
  name: string
  code: string
  mainCategoryId?: number
  descriptionExample?: string
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
  labelId: number | null
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

export type NotificationType =
  | 'COMMENT'
  | 'TASK_REQUESTED'
  | 'STATUS_SWITCHED'
  | 'PROCESSOR_ASSIGNED'
  | 'PROCESSOR_CHANGED'

export interface NotificationContent {
  notificationId: number
  taskId: number
  notificationType: NotificationType
  receiverId: number
  taskTitle: string
  message: string
  isRead: boolean
  createdAt: string
}
export interface TaskDetailHistoryProps {
  historyData: TaskHistory[]
  taskId: number
  requestorName: string
}

export interface TaskDetailHistoryChatProps {
  history: TaskHistory
  taskId: number
  requestorName: string
}

export type RoleInMenu = 'manager' | 'user' | 'admin'

export interface MenuItemProps {
  menuId: number
  content: string
  role: RoleInMenu
  link: string
}

export interface User {
  profileImageUrl: string
  name: string
  nickname: string
  email: string
  isReviewer: boolean
  role: Role | ''
  departmentName: string
  departmentRole: string
  notificationSettingInfo: {
    agit: boolean
    email: boolean
    kakaoWork: boolean
  }
}

export interface SideMenu {
  groupId: number
  groupTitle: string
  items: MenuItemProps[]
}
