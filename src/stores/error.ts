import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
  const header = ref('')
  const body = ref('')
  const onClick = ref<(() => void) | null>(null)

  const setError = (newHeader: string, newBody?: string, newOnClick?: () => void) => {
    header.value = newHeader
    if (newBody) body.value = newBody
    if (newOnClick) onClick.value = newOnClick
  }

  const clearError = () => {
    header.value = ''
    body.value = ''
    onClick.value = null
  }

  return { header, body, onClick, setError, clearError }
})
