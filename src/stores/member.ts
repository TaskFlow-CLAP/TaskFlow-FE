import type { User } from '@/types/common'
import { axiosInstance } from '@/utils/axios'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  const isPendingUser = ref(false)

  const updateMemberInfoWithToken = async () => {
    isPendingUser.value = false
    const token = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')
    if (!token) {
      return
    } else if (!refreshToken) {
      isPendingUser.value = true
      return
    }

    const { data }: { data: User } = await axiosInstance.get('/api/members/info')
    info.value = data
    isLogined.value = true
    return data.role
  }

  const logout = () => {
    $reset()
    isLogined.value = false
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  }

  const $reset = () => {
    info.value = INITIAL_INFO
  }

  return {
    info,
    isLogined,
    isPendingUser,
    updateMemberInfoWithToken,
    logout,
    $reset
  }
})
