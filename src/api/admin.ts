import { axiosInstance } from '@/utils/axios'

export const getDivisionsAdmin = async () => {
  const response = await axiosInstance.get('/api/managements/labels')
  return response.data
}
