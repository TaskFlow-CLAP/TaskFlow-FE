import type { Status } from '@/types/common'
import type { RequestApprovePostTypes } from '@/types/manager'
import type { userInfo } from '@/types/user'
import { axiosInstance, formDataAxiosInstance } from '@/utils/axios'

export const patchEditInfo = async (formdata: userInfo, image: File) => {
  const response = await formDataAxiosInstance.post('/api/tasks', formdata, image)
  return response.data
}

export const postTaskRequest = async (formdata: FormData) => {
  const response = await formDataAxiosInstance.post('/api/tasks', formdata)
  return response.data
}

export const getTaskDetailUser = async (id: number) => {
  const response = await axiosInstance.get(`/api/tasks/${id}/requests/details`)
  return response.data
}

export const getTaskDetailManager = async (id: number) => {
  const response = await axiosInstance.get(`/api/tasks/${id}/details`)
  return response.data
}

export const getLabelsManager = async () => {
  const response = await axiosInstance.get('/api/labels?page=0&size=5')
  return response.data
}

export const postTaskApprove = async (id: number, data: RequestApprovePostTypes) => {
  const response = await axiosInstance.post(`/api/tasks/${id}/approval`, data)
  return response.data
}

export const getManager = async () => {
  const response = await axiosInstance.get('/api/managers')
  return response.data
}

export const changeProcessor = async (taskID: number, processorId: number) => {
  const response = await axiosInstance.patch(`/api/tasks/${taskID}/processor`, { processorId })
  return response.data
}

export const patchChangeStatus = async (taskID: number, status: Status) => {
  const response = await axiosInstance.patch(`/api/tasks/${taskID}/status`, status)
  return response.data
}

export const changeLabel = async (taskID: number, labelId: number) => {
  const response = await axiosInstance.patch(`/api/tasks/${taskID}/label`, { labelId })
  return response.data
}

export const getHistory = async (taskID: number) => {
  const response = await axiosInstance.get(`/api/tasks/${taskID}/histories`)
  return response.data
}

export const postComment = async (taskID: number, content: string) => {
  const response = await axiosInstance.post(`/api/comments/${taskID}`, { content })
  return response.data
}

export const postCommentAttachment = async (taskID: number, formdata: FormData) => {
  const response = await formDataAxiosInstance.post(`/api/comments/attachment/${taskID}`, formdata)
  return response.data
}

export const patchComment = async (commentId: number, content: string) => {
  const response = await axiosInstance.patch(`/api/comments/${commentId}`, { content })
  return response.data
}

export const deleteComment = async (commentId: number) => {
  const response = await axiosInstance.delete(`/api/comments/${commentId}`)
  return response.data
}

export const patchTaskRequest = async (taskId: string, formdata: FormData) => {
  const response = await formDataAxiosInstance.patch(`/api/tasks/${taskId}`, formdata)
  return response.data
}
