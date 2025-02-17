<template>
  <Teleport to="#modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-15 flex justify-center items-center z-[99]"
      @click.self="closeModal" />
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="bg-white rounded-lg shadow-lg px-8 py-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99]">
        <div class="flex flex-col gap-8 w-[300px]">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col items-center gap-2">
              <CommonIcons
                v-if="type == 'successType'"
                :name="successIcon" />
              <CommonIcons
                v-if="type == 'failType' || type == 'inputType' || type === 'terminate'"
                :name="failIcon" />
              <CommonIcons
                v-if="type == 'warningType'"
                :name="warningIcon" />
              <LoadingIcon v-if="type == 'loadingType'" />
              <div
                v-if="$slots.header"
                class="flex text-2xl font-semibold justify-center whitespace-pre-wrap text-center">
                <slot name="header"></slot>
              </div>

              <div
                v-if="type != 'inputType' && $slots.body"
                class="flex text-sm font-semibold text-body justify-center whitespace-pre-wrap text-center">
                <slot name="body"></slot>
              </div>
            </div>
            <textarea
              v-if="type == 'inputType' || type === 'terminate'"
              v-model="textValue"
              :placeholder="
                type === 'terminate' ? '종료 사유를 입력해주세요' : '반려 사유를 입력해주세요'
              "
              :class="{ 'border border-red-1 placeholder-red-500': isEmpty }"
              class="flex border w-full border-border-1 px-4 py-3 focus:outline-none resize-none h-[120px]" />
          </div>

          <button
            type="button"
            class="button-large-primary"
            v-if="type == 'successType'"
            @click="closeModal">
            확인
          </button>

          <button
            type="button"
            class="button-large-default"
            v-if="type == 'failType'"
            @click="closeModal">
            확인
          </button>

          <div
            class="flex items-center gap-6"
            v-if="type == 'warningType' || type == 'inputType' || type === 'terminate'">
            <button
              type="button"
              class="button-large-default"
              @click="closeModal">
              취소
            </button>
            <button
              type="button"
              class="button-large-red"
              @click="confirmModal">
              {{ type === 'inputType' ? '반려' : type === 'terminate' ? '종료' : '확인' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { failIcon, successIcon, warningIcon } from '@/constants/iconPath'
import { onUnmounted, ref, watch } from 'vue'
import CommonIcons from './CommonIcons.vue'
import LoadingIcon from './LoadingIcon.vue'
import { useIsOverlayOpenStore } from '@/stores/isOverlayOpen'

const { isOpen, type, modelValue, isEmpty } = defineProps<{
  isOpen: boolean
  type?: string
  modelValue?: string
  isEmpty?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'click'): void
  (e: 'update:modelValue', value: string): void
}>()

const textValue = ref(modelValue || '')

watch(textValue, newValue => {
  emit('update:modelValue', newValue)
})

const closeModal = () => {
  textValue.value = ''
  emit('close')
}

const confirmModal = () => {
  emit('click')
}

const { setIsOverlayOpen } = useIsOverlayOpenStore()
watch(
  () => isOpen,
  () => {
    if (isOpen) {
      textValue.value = ''
      setIsOverlayOpen(true)
    } else {
      setIsOverlayOpen(false)
    }
  }
)

onUnmounted(() => {
  setIsOverlayOpen(false)
})
</script>
