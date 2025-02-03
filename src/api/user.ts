import { formDataAxiosInstance } from '@/utils/axios'

export const postTaskRequest = async (formdata: FormData) => {
  const response = await formDataAxiosInstance.post('/api/tasks', formdata)
  return response.data
}

export const getTaskDetailUser = async (id: number) => {
  const response = await formDataAxiosInstance.get(`/api/tasks/${id}/requests/details`)
  return response.data
}

export const getTaskDetailManager = async (id: number) => {
  const response = await formDataAxiosInstance.get(`/api/tasks/${id}/details`)
  return response.data
}
