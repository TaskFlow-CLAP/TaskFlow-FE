import { formDataAxiosInstance } from '@/utils/axios'

export const postTaskRequest = async (formdata: FormData) => {
  const response = await formDataAxiosInstance.post('/api/tasks', formdata)
  return response.data
}
