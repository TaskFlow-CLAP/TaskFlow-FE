<template>
  <div>
    <div class="text-xs text-body font-bold">첨부 파일</div>
    <input
      class="hidden"
      type="file"
      id="file"
      @change="handleFileUpload" />
    <div
      class="w-full h-32 mt-2 rounded py-[31px] bg-white flex flex-col gap-4 items-center justify-center border-2 border-border-1 border-dashed">
      <div class="text-sm text-disabled font-bold">첨부할 파일을 끌어 놓으세요</div>
      <label
        for="file"
        class="w-[97px] h-8 rounded px-4 py-2 bg-primary1 text-white font-bold flex text-xs items-center justify-center cursor-pointer">
        파일 선택
      </label>
      <p>
        {{ props.modelValue?.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: File | null
}>()
const emit = defineEmits(['update:modelValue'])

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    emit('update:modelValue', target.files[0])
  } else {
    emit('update:modelValue', null)
  }
}
</script>

<style scoped></style>
