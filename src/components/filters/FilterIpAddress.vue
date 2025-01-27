<template>
  <div class="filter-container w-36">
    <span class="filter-title">IP 주소</span>
    <div
      class="w-full h-8 border-b border-border-1 text-xs text-black flex items-center gap-1 px-2">
      <template
        v-for="(block, index) in blocks"
        :key="index">
        <input
          class="w-full grow outline-none text-center"
          v-model="blocks[index]"
          :maxlength="3"
          @input="onValueChange(index)" />
        <span v-if="index !== 3">.</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// const emit = defineEmits(['update:value'])

const blocks = ref(['', '', '', ''])

const onValueChange = (index: number) => {
  const value = blocks.value[index].replace(/\D/g, '')
  blocks.value[index] = Number(value) > 255 ? '255' : value
}
</script>
