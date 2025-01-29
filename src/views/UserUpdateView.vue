<template>
  <div class="form-view-container">
    <div class="w-full h-[54px] border-l-8 border-l-primary1 flex items-center pl-5">
      <h1 class="text-2xl font-bold">새 회원 추가</h1>
    </div>
    <UserRegistration />
  </div>
  <div class="w-full bg-body"></div>
</template>

<script setup lang="ts">
import UserRegistration from '@/components/user-registration/UserRegistration.vue';

</script>
