import axios from '../utils/axios'

export const getNotifications = async () => {
  const response = await axios.get('/api/notifications?page=0&size=5')
  return response.data
}

export const postLogin = async (nickname: string, password: string) => {
  const response = await axios.post('/api/auths/login', { nickname, password })
  return response.data
}

export const patchReadNotification = async (notificationId: number) => {
  const response = await axios.patch(`/api/notification/${notificationId}`)
  return response.data
}
