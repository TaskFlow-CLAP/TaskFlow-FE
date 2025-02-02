import { axiosInstance } from '@/utils/axios'

export const getLabelsAdmin = async () => {
  const response = await axiosInstance.get('/api/managements/labels')
  return response.data
}

export const deleteLabelAdmin = async (id: number) => {
  const response = await axiosInstance.delete(`/api/management/labels/${id}`)
  return response.data
}
