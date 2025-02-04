import type { RequestApprovePostTypes } from '@/types/manager'
import { axiosInstance, formDataAxiosInstance } from '@/utils/axios'

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
