<template>
  <svg
    :width="name?.width"
    :height="name?.height"
    :viewBox="`0 0 ${name?.width} ${name?.height}`"
    :fill="isHovered ? name?.hoverFill || name?.fill : name?.fill"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    :class="className"
    @click="onClick">
    <path
      v-for="(p, index) in Array.isArray(name?.path) ? name.path : [name?.path]"
      :key="index"
      :d="p"
      v-bind="name?.options" />
  </svg>
</template>

<script setup lang="ts">
import type { IconProps } from '@/types/icon'
import { defineProps, ref } from 'vue'
const isHovered = ref(false)
const { name, className, onClick } = defineProps<IconProps>()
</script>
