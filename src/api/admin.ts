import { axiosInstance } from '@/utils/axios'

export const getLabelsAdmin = async () => {
  const response = await axiosInstance.get('/api/managements/labels')
  return response.data
}

export const deleteLabelAdmin = async (id: string) => {
  const response = await axiosInstance.delete(`/api/managements/labels/${id}`)
  return response.data
}
