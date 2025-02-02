import { axiosInstance } from '@/utils/axios'
import Cookies from 'js-cookie'
import type { loginDataTypes } from '@/types/auth'

export const postLogin = async (loginData: loginDataTypes, sessionId: string) => {
  const response = await axiosInstance.post('/api/auths/login', loginData, {
    headers: { sessionId: sessionId }
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
