import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScrollLockStore = defineStore('scrollLock', () => {
  const scrollLock = ref(false)

  return { scrollLock }
})
