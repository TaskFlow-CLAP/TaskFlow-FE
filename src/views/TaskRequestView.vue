<template>
  <div class="max-w-600 flex flex-col px-6 gap-y-6 pt-10">
    <div class="w-full h-[54px] border-l-8 border-l-primary1 flex items-center pl-5">
      <h1 class="text-2xl font-bold">작업 요청</h1>
    </div>
    <RequestTask />
  </div>
  <div class="w-full bg-body">
    <!-- <TaskDetail
      :isManager="false"
      :isApproved="false"
      :closeTaskDetail="closeTaskDetailFunction" /> -->
  </div>
</template>

<script setup lang="ts">
// const closeTaskDetailFunction = () => {
//   // Define the function to close task detail
// }
</script>
