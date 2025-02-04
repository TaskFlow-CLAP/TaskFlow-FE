<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex z-50 justify-center"
    @click.self="closeModal">
    <div
      class="flex relative w-[1200px] h-[72px] bg-opacity-15"
      @click.self="closeModal">
      <div
        class="absolute right-6 top-[72px] h-60 w-80 bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div class="flex relative px-4 pt-3 pb-2 border-b border-border-2">
          <p class="text-body font-bold text-xs">알림</p>
          <div class="absolute right-4">
            <div class="flex items-center">
              <button class="flex items-center">
                <CommonIcons
                  :name="smallCheckIcon"
                  class="w-2.5 h-1.5 mr-1 fill-primary1" />
                <p class="font-bold text-primary1 text-xs">모두 읽음</p>
              </button>
              <CommonIcons
                :name="closeIcon"
                class="ml-2 cursor-pointer"
                @click="closeModal" />
            </div>
          </div>
        </div>
        <div class="max-h-[186px] flex flex-col h-full overflow-y-auto">
          <div class="overflow-y-scroll flex"></div>
          <button :class="['flex flex-col border-b py-3 px-4', { 'bg-primary2': isCheck }]">
            <p class="text-xs text-body font-bold">{{ title }}</p>
            <div class="flex text-xs pt-2">
              <span class="text-black">
                <span class="text-primary1 font-bold">"{{ taskTitle }}"</span>
                &nbsp;요청이&nbsp;
                <span class="text-primary1 font-bold">{{ message }}</span>
                &nbsp;상태로 변경 되었습니다
              </span>
            </div>
          </button>
          <button :class="['flex flex-col border-b py-3 px-4', { 'bg-primary2': !isCheck }]">
            <p class="text-xs text-body font-bold">{{ title }}</p>
            <div class="flex text-xs pt-2">
              <span class="text-black">
                <span class="text-primary1 font-bold">"{{ taskTitle }}"</span>
                &nbsp;요청이&nbsp;
                <span class="text-primary1 font-bold">{{ message }}</span>
                &nbsp;상태로 변경 되었습니다
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommonIcons from '../common/CommonIcons.vue'
import { smallCheckIcon, closeIcon } from '@/constants/iconPath'
const props = defineProps<{
  isOpen: boolean
}>()

const title = ref('작업 상태 변경 알림')
const taskTitle = ref('VM 생성 요청')
const message = ref('진행 중')
const isCheck = ref(true)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('close')
}
</script>
