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

<script setup lang="ts">
interface ButtonPropsTypes {
  color?: string
  name?: string
  type?: string
  size?: string
}

const props = withDefaults(defineProps<ButtonPropsTypes>(), {
  color: 'default',
  name: '확인',
  type: 'button',
  size: 'button'
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>
