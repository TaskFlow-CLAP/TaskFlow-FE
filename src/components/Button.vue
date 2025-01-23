<template>
  <div>
    <div v-if="color == 'primaryButton'">
      <button
        :type="type === 'submit' ? 'submit' : 'button'"
        @click="handleClick"
        class="w-full py-3 px-4 bg-primary1 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
        {{ name }}
      </button>
    </div>

    <div v-if="color == 'whiteButton'">
      <button
        :type="type === 'submit' ? 'submit' : 'button'"
        @click="handleClick"
        class="flex w-full py-3 bg-white text-zinc-400 font-bold border border-zinc-400 rounded items-center justify-center min-w-[138px]">
        {{ name }}
      </button>
    </div>

    <div v-if="color == 'redButton'">
      <button
        :type="type === 'submit' ? 'submit' : 'button'"
        @click="handleClick"
        class="flex w-full py-3 bg-red-1 text-white border border-red-1 font-bold rounded items-center justify-center min-w-[138px]">
        {{ name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonView',
  props: {
    color: {
      type: String,
      default: 'default'
    },
    name: {
      type: String,
      default: '확인'
    },
    type: {
      type: String,
      default: 'button'
    },
    size: {
      size: String,
      default: 'button'
    }
  },
  emits: ['click'],
  setup(_, { emit }) {
    const handleClick = () => {
      emit('click')
    }
    return {
      handleClick
    }
  }
})
</script>
