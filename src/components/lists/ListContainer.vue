<template>
  <div class="flex flex-col items-center gap-4 grow overflow-hidden">
    <div class="w-full flex flex-col grow overflow-hidden">
      <slot name="listBar" />

      <div class="grow overflow-y-auto">
        <slot name="listCards" />
      </div>
    </div>

    <slot name="pagination" />
  </div>
</template>
