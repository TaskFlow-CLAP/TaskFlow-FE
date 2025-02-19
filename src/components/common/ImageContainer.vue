<template>
  <div
    :style="{ width: `${size}px`, height: `${size}px` }"
    class="rounded-full overflow-hidden flex justify-center items-center shrink-0">
    <img
      :src="url || defaultProfile"
      alt="프로필 이미지"
      class="w-full h-full object-cover" />
  </div>
</template>

<script setup lang="ts">
import defaultProfile from '/deafultProfile.png'

const { url, size } = defineProps<{ url?: string; size: number }>()
</script>
