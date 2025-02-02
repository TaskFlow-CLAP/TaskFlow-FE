import { axiosInstance } from '@/utils/axios'
import Cookies from 'js-cookie'

export const postLogin = async (nickname: string, password: string) => {
  const body = {
    nickname: nickname,
    password: password
  }
  const sessionIdValue = '123'

  const response = await axiosInstance.post('/api/auths/login', body, {
    headers: {
      sessionId: sessionIdValue
    }
  })

  Cookies.set('accessToken', response.data.accessToken, {
    path: '/',
    sameSite: 'strict'
  })

  return response.data
}

export const patchPassword = async (password: string) => {
  const accessToken = Cookies.get('accessToken')

  if (!accessToken) return

  const response = await axiosInstance.patch('/api/members/password', password, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response.data
}
