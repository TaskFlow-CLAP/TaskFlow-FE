import { axiosInstance } from '../utils/axios'

export const getMainCategory = async () => {
  const response = await axiosInstance.get('/api/main-category')
  return response.data
}

export const getSubCategory = async () => {
  const response = await axiosInstance.get('/api/sub-category')
  return response.data
}

export const getAllCategory = async () => {
  const response = await axiosInstance.get('/api/category')
  return response.data
}
