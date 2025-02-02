import axiosInstance from '@/utils/axios'
import Cookies from 'js-cookie'

export const postLogin = async (nickname: string, password: string) => {
  const body = {
    nickname: nickname,
    password: password
  }
  const sessionIdValue = '123'
  try {
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
  } catch (error) {
    console.error('로그인 오류:', error)
    throw error
  }
}
