import { axiosInstance, formDataAxiosInstance } from '../utils/axios'

export const patchEditInfo = async (formdata: FormData) => {
  const response = await formDataAxiosInstance.patch('/api/members/info', formdata)
  return response.data
}

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

export const getLabels = async () => {
  const response = await axiosInstance.get('/api/labels')
  return response.data
}

export const getCategory = async () => {
  const response = await axiosInstance.get('/api/category')
  return response.data
}
