<template>
  <div class="filter-container w-36">
    <span class="filter-title">IP 주소</span>
    <div
      class="w-full h-8 border-b border-border-1 text-xs text-black flex items-center gap-1 px-2">
      <template
        v-for="(block, index) in blocks"
        :key="index">
        <input
          :ref="el => (inputRefs[index] = el as HTMLInputElement)"
          class="w-full grow outline-none text-center"
          v-model="blocks[index]"
          :maxlength="3"
          @input="onValueChange(index)"
          @keydown="event => onKeyDown(event, index)"
          @focus="onFocus(index)" />
        <span v-if="index !== 3">.</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['update:value'])

const blocks = ref(['', '', '', ''])
const inputRefs = ref<(HTMLInputElement | null)[]>([])

const onValueChange = (index: number) => {
  const value = blocks.value[index].replace(/\D/g, '')
  blocks.value[index] = Number(value) > 255 ? '255' : value

  if (value.length === 3 && index < 3) {
    inputRefs.value[index + 1]?.focus()
  }

  if (value.length === 0) {
    for (let i = index + 1; i <= 3; i++) {
      blocks.value[i] = ''
    }
  }

  setTimeout(() => {
    emit('update:value', blocks.value.filter(el => el !== '').join('.'))
  }, 500)
}

const onKeyDown = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace' && blocks.value[index] === '' && index > 0) {
    event.preventDefault()
    blocks.value[index - 1] = blocks.value[index - 1].slice(0, -1)
    inputRefs.value[index - 1]?.focus()
    return
  }

  if (event.key === 'ArrowLeft' && inputRefs.value[index]?.selectionStart === 0 && index > 0) {
    event.preventDefault()
    inputRefs.value[index - 1]?.focus()
    inputRefs.value[index - 1]?.setSelectionRange(
      blocks.value[index - 1].length,
      blocks.value[index - 1].length
    )
    return
  }

  if (
    event.key === 'ArrowRight' &&
    inputRefs.value[index]?.selectionEnd === blocks.value[index].length &&
    index < 3
  ) {
    event.preventDefault()
    inputRefs.value[index + 1]?.focus()
    inputRefs.value[index + 1]?.setSelectionRange(0, 0)
  }
}

const onFocus = (index: number) => {
  for (let i = index - 1; i >= 0; i--) {
    if (blocks.value[i] === '') {
      inputRefs.value[i]?.focus()
      break
    }
  }
}
</script>
