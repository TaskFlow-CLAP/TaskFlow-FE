export interface MyRequestParams {
  term: number
  mainCategory: number[]
  category: number[]
  title: string
  nickName: string
  taskStatus: string[]
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
  taskStatus: string
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

export interface AttachmentResponse {
  fileId: number
  fileUrl: string
  fileUploadedAt: string
  fileSize: string
  fileName: string
}

export interface TaskDetailRightProps {
  taskId: string
  requestedAt: string
  finishedAt: string
  taskStatus: string
  requesterNickName: string
  requesterImageUrl: string
  processorNickName: string
  processorImageUrl: string
}

export interface TaskDetailLeftProps {
  mainCategoryName: string
  categoryName: string
  title: string
  description: string
  attachmentResponse: AttachmentResponse[]
}

export interface TaskDetailDatas {
  taskId: string
  taskCode: string
  requestedAt: string
  finishedAt: string
  taskStatus: string
  requesterNickName: string
  requesterImageUrl: string
  processorNickName: string
  processorImageUrl: string
  mainCategoryName: string
  categoryName: string
  title: string
  description: string
  attachmentResponse: AttachmentResponse[]
}

type TaskHistoryType =
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
