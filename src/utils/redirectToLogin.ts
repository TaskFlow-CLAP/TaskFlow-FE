import { useErrorStore } from '@/stores/error'

export const redirectToLogin = (url?: string) => {
  const { clearError } = useErrorStore()
  clearError()
  window.location.href = url || '/login'
}
