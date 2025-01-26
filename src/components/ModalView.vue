<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-15 flex justify-center items-center z-50"
    @click.self="closeModal">
    <div class="bg-white rounded-lg shadow-lg px-8 py-8 min-w-[364px]">
      <div class="mb-2 min-h-16">
        <div
          v-if="type == 'successType'"
          class="flex ic justify-center">
          <CommonIcons :name="successIcon" />
        </div>
        <div
          v-if="type == 'failType' || type == 'inputType'"
          class="flex ic justify-center">
          <CommonIcons :name="failIcon" />
        </div>
        <div
          v-if="type == 'warningType'"
          class="flex ic justify-center">
          <CommonIcons :name="warningIcon" />
        </div>
      </div>

      <div>
        <div class="flex text-2xl font-bold justify-center mb-2">
          <slot name="header"></slot>
        </div>
        <div
          v-if="type != 'inputType'"
          class="flex text-sm font-bold text-body justify-center">
          <slot name="body"></slot>
        </div>
      </div>

      <textarea
        v-if="type == 'inputType'"
        v-model="textValue"
        placeholder="거부 사유를 입력해주세요"
        class="flex border w-full border-zinc-300 px-4 py-3 focus:outline-none resize-none mt-6 h-[120px]" />
      <div class="mt-8">
        <button
          class="button-large-primary"
          v-if="type == 'successType'"
          @click="closeModal">
          확인
        </button>

        <button
          class="button-large-default"
          v-if="type == 'failType'"
          @click="closeModal">
          확인
        </button>

        <div
          class="flex mt-8 items-center"
          v-if="type == 'warningType' || type == 'inputType'">
          <div class="mr-6">
            <button
              class="button-large-default"
              @click="closeModal">
              취소
            </button>
          </div>
          <div>
            <button
              class="button-large-red"
              @click="confirmModal">
              {{ type === 'inputType' ? '거부' : '삭제' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CommonIcons from './common/CommonIcons.vue'
import { successIcon, failIcon, warningIcon } from '../constants/iconPath'

const props = defineProps<{
  isOpen: boolean
  type?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'click'): void
  (e: 'update:modelValue', value: string): void
}>()

const textValue = ref(props.modelValue || '')

watch(textValue, newValue => {
  emit('update:modelValue', newValue)
})

const closeModal = () => {
  emit('close')
}

const confirmModal = () => {
  emit('click')
}
</script>
