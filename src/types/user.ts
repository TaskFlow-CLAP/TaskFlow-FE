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

export interface AttachmentResponse {
  fileId: number
  fileUrl: string
  fileUploadedAt: string
  fileSize: string
  fileName: string
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
