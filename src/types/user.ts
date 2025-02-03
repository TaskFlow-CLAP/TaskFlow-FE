import type { LabelDataTypes, Status } from './common'

export interface MyRequestListData {
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
  isLabel?: boolean
}

export interface RequestTaskInputProps {
  modelValue: string
  placeholderText: string
  labelName: string
  isNotRequired?: boolean
  isEdit?: boolean
  isInvalidate?: string
}

export interface RequestTaskFileInputProps {
  files: File[] | null
  removeFile: (index: number) => void
}

export interface RequestTaskTextAreaProps {
  modelValue: string
  placeholderText: string
}

export interface AttachmentResponse {
  fileId: number
  fileUrl: string
  fileUploadedAt: string
  fileSize: string
  fileName: string
}
export interface TaskDetailDatas {
  taskId: number
  taskCode: string
  requestedAt: string
  finishedAt: string
  taskStatus: Status
  requesterNickName: string
  requesterImageUrl: string
  processorNickName: string
  processorImageUrl: string
  mainCategoryName: string
  categoryName: string
  title: string
  description: string
  attachmentResponse: AttachmentResponse[]
  dueDate?: string
  labelName?: string
}

export type TaskHistoryType =
  | 'COMMENT'
  | 'COMMENT_FILE'
  | 'STATUS_SWITCHED'
  | 'PROCESSOR_ASSIGNED'
  | 'PROCESSOR_CHANGED'

interface TaskDetailHistoryFileTypes {
  fileId: number
  fileUrl: string
  fileName: string
}

export interface TaskDetailHistoryProps {
  date: string
  time: string
  name: string
  profileImageUrl: string
  TaskHistoryType: TaskHistoryType
  isModified: boolean
  details: {
    previousProcessor: string
    currentProcessor: string
    comment?: string
    updateDetails?: string
    taskStatus?: string
    file?: TaskDetailHistoryFileTypes
  }
}

export interface TaskDetailProps {
  isApproved: boolean
  selectedId: number
  closeTaskDetail: () => void
}
export interface ManagerInfoTypes {
  nickName: string
  profileUrl: string
  totalAssignedTasks: number
}

export interface TaskDetailDropdownProps {
  options: string[]
  modelValue: string
  processor: ManagerInfoTypes
}

export interface TaskDetailRightProps {
  taskDetail: TaskDetailDatas
}

export interface TaskDetailLabelDropdownProps {
  options: LabelDataTypes[]
  modelValue: string
}

export interface TaskHistoryDatas {
  taskId: number
  taskCode: string
  requestedAt: string
  finishedAt: string
  taskStatus: Status
  requesterNickName: string
  requesterImageUrl: string
  processorNickName: string
  processorImageUrl: string
  mainCategoryName: string
  categoryName: string
  title: string
  description: string
  attachmentResponse: AttachmentResponse[]
  dueDate?: string
  labelName?: string
}

export interface MyRequestResponse {
  content: MyRequestListData[]
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: boolean
  isLast: boolean
}
