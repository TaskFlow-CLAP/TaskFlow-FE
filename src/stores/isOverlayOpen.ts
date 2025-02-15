import { preventEnter } from '@/utils/preventEnter'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIsOverlayOpenStore = defineStore('isOverlayOpen', () => {
  const isOverlayOpen = ref(false)
  const scrollbarWidth = ref(0)

  const setIsOverlayOpen = (isOpen: boolean) => {
    if (isOpen) {
      scrollbarWidth.value = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', preventEnter)
      if (scrollbarWidth.value > 0) {
        document.body.style.paddingRight = `${scrollbarWidth.value}px`
      }
      isOverlayOpen.value = true
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', preventEnter)
      document.body.style.paddingRight = ''
      isOverlayOpen.value = false
    }
  }

  return { isOverlayOpen, scrollbarWidth, setIsOverlayOpen }
})
