import { onMounted, onUnmounted, ref } from 'vue'

export const useOutsideClick = (onClick: () => void) => {
  const htmlRef = ref<HTMLElement | null>(null)

  const onOutsideClick = (event: MouseEvent) => {
    if (htmlRef.value && !htmlRef.value.contains(event.target as Node)) {
      onClick()
    }
  }

  onMounted(() => {
    window.addEventListener('click', onOutsideClick)
  })
  onUnmounted(() => {
    window.removeEventListener('click', onOutsideClick)
  })
  return { htmlRef }
}
