import { axiosInstance } from '../utils/axios'

export const getNotification = async (pageNum: number, sizeNum: number) => {
  const response = await axiosInstance.get(`/api/notifications?page=${pageNum}&size=${sizeNum}`)

  return response.data
}

export const patchNotificationRead = async (notificationId: number) => {
  const response = await axiosInstance.patch(`/api/notification/${notificationId}`)
  console.log(notificationId)
  return response.data
}

export const getNotifiCount = async () => {
  const response = await axiosInstance.get(`/api/notifications/count`)
  console.log(response.data)
  return response.data
}

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
