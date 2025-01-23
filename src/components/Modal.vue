<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-15 flex justify-center items-center z-50"
    @click.self="closeModal">
    <div class="bg-white rounded-lg shadow-lg px-8 py-8 min-w-[364px]">
      <!-- 아이콘 -->
      <!-- icon 추가시, 변경 필요 -->
      <div class="flex justify-center mb-2">
        <svg
          v-if="
            type == 'checkType' || type == 'deleteType' || type == 'xType' || type == 'inputType'
          "
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M28.2666 36.8L22.5333 31.0666C22.0444 30.5778 21.4221 30.3333 20.6666 30.3333C19.911 30.3333 19.2888 30.5778 18.7999 31.0666C18.311 31.5555 18.0666 32.1778 18.0666 32.9333C18.0666 33.6889 18.311 34.3111 18.7999 34.8L26.3999 42.4C26.9333 42.9333 27.5555 43.2 28.2666 43.2C28.9777 43.2 29.5999 42.9333 30.1333 42.4L45.1999 27.3333C45.6888 26.8444 45.9333 26.2222 45.9333 25.4666C45.9333 24.7111 45.6888 24.0889 45.1999 23.6C44.711 23.1111 44.0888 22.8666 43.3333 22.8666C42.5777 22.8666 41.9555 23.1111 41.4666 23.6L28.2666 36.8ZM31.9999 58.6666C28.311 58.6666 24.8444 57.9662 21.5999 56.5653C18.3555 55.1644 15.5333 53.2649 13.1333 50.8666C10.7333 48.4684 8.8337 45.6462 7.43459 42.4C6.03548 39.1538 5.33503 35.6871 5.33326 32C5.33148 28.3129 6.03192 24.8462 7.43459 21.6C8.83726 18.3538 10.7368 15.5315 13.1333 13.1333C15.5297 10.7351 18.3519 8.83554 21.5999 7.43465C24.8479 6.03376 28.3146 5.33331 31.9999 5.33331C35.6853 5.33331 39.1519 6.03376 42.3999 7.43465C45.6479 8.83554 48.4701 10.7351 50.8666 13.1333C53.263 15.5315 55.1635 18.3538 56.5679 21.6C57.9724 24.8462 58.6719 28.3129 58.6666 32C58.6613 35.6871 57.9608 39.1538 56.5653 42.4C55.1697 45.6462 53.2701 48.4684 50.8666 50.8666C48.463 53.2649 45.6408 55.1653 42.3999 56.568C39.159 57.9706 35.6924 58.6702 31.9999 58.6666ZM31.9999 53.3333C37.9555 53.3333 42.9999 51.2666 47.1333 47.1333C51.2666 43 53.3333 37.9555 53.3333 32C53.3333 26.0444 51.2666 21 47.1333 16.8666C42.9999 12.7333 37.9555 10.6666 31.9999 10.6666C26.0444 10.6666 20.9999 12.7333 16.8666 16.8666C12.7333 21 10.6666 26.0444 10.6666 32C10.6666 37.9555 12.7333 43 16.8666 47.1333C20.9999 51.2666 26.0444 53.3333 31.9999 53.3333Z"
            fill="#7879EB" />
        </svg>
      </div>
      <div class=""></div>
      <!-- 제목 -->
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
      <form
        v-if="type == 'inputType'"
        @submit.prevent="submitForm">
        <textarea
          v-model="textValue"
          placeholder="거부 사유를 입력해주세요"
          class="flex border w-full border-zinc-300 px-4 py-3 focus:outline-none resize-none mt-6 h-[120px]" />
      </form>
      <!-- 확인 버튼(primary1) -->
      <button
        v-if="type == 'checkType'"
        @click="closeModal"
        class="flex w-full py-3 mt-8 bg-primary1 text-white font-bold rounded items-center justify-center">
        확인
      </button>
      <!-- 확인 버튼(white) -->
      <button
        v-if="type == 'xType'"
        @click="closeModal"
        class="flex w-full py-3 mt-8 bg-white text-zinc-400 font-bold border border-zinc-400 rounded items-center justify-center">
        확인
      </button>
      <!-- white & red  -->
      <div
        class="flex mt-8"
        v-if="type == 'deleteType' || type == 'inputType'">
        <button
          @click="closeModal"
          class="flex w-full py-3 mr-6 bg-white text-zinc-400 font-bold border border-zinc-400 rounded items-center justify-center">
          확인
        </button>
        <button
          @click="onClick"
          class="flex w-full py-3 bg-red-1 text-white font-bold border rounded items-center justify-center">
          <slot name="red"></slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'ModalView',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      default: 'default'
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['close', 'click', 'update:modelValue'],
  setup(props, { emit }) {
    const textValue = ref('')
    watch(textValue, newValue => {
      // textValue 값이 변경되면 부모에게 전달
      emit('update:modelValue', newValue)
    })

    const closeModal = () => {
      emit('close')
    }
    const onClick = () => {
      if (props.type == 'inputType') {
        emit('click')
      }
    }

    return {
      closeModal,
      onClick,
      textValue
    }
  }
})
</script>
