import { useErrorStore } from '@/stores/error'

export const redirectToLogin = () => {
  const { clearError } = useErrorStore()
  clearError()
  window.location.href = '/login'
}
