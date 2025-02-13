import { defineStore } from 'pinia'
import { axiosInstance } from '@/utils/axios'
import { ref } from 'vue'
import type { User } from '@/types/auth'
import Cookies from 'js-cookie'

export const useMemberStore = defineStore('memberInfo', () => {
  const INITIAL_INFO: User = {
    profileImageUrl: '',
    name: '',
    nickname: '',
    email: '',
    isReviewer: false,
    role: '',
    departmentName: '',
    departmentRole: '',
    notificationSettingInfo: {
      agit: false,
      email: false,
      kakaoWork: false
    }
  }

  const info = ref<User>(INITIAL_INFO)
  const isLogined = ref(false)

  async function updateMemberInfoWithToken() {
    const token = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')
    if (!token || !refreshToken) return

    const { data }: { data: User } = await axiosInstance.get('/api/members/info')
    info.value = data
    isLogined.value = true
    return data.role
  }

  function logout() {
    $reset()
    isLogined.value = false
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  }

  function $reset() {
    info.value = INITIAL_INFO
  }

  return {
    info,
    isLogined,
    updateMemberInfoWithToken,
    logout,
    $reset
  }
})
