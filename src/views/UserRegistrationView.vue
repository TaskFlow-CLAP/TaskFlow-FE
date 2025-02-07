<template>
  <div class="form-view-container">
    <TitleBar title="새 회원 추가" />
    <UserRegistration />
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/common/TitleBar.vue'
import UserRegistration from '@/components/user-manage/UserRegistration.vue'
</script>
