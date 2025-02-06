export interface User {
  name: string
  nickname: string
  email: string
  profileImageUrl: string
  role: string
  memberStatus: string
  departmentName: string
  departmentRole: string
  notificationSettingInfo: {
    agit: boolean
    email: boolean
    kakaoWork: boolean
  }
}

export interface loginDataTypes {
  nickname: string
  password: string
}
