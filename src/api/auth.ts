import axiosInstance from '@/utils/axios'

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
    return response.data
  } catch (error) {
    console.error('로그인 오류:', error)
    throw error
  }
}
