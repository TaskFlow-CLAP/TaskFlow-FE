<template>
  <div class="form-view-container">
    <TitleBar title="회원 정보 수정" />
    <UserUpdate />
  </div>
  <div class="w-full bg-body"></div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/TitleBar.vue'
import UserUpdate from '@/components/user-manage/UserUpdate.vue'
</script>
