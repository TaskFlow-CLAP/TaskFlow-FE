<template>
  <main class="w-full h-screen">
    <div class="flex items-center mb-8 text-[10px]">
      <div class='w-20'>
      <CommonIcons :name="dropdownIcon" />
      <span>dropdownIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="hamburgerIcon" />
      <span>hamburgerIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="notifiacationIcon" />
      <span>notifiacationIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="bentoIcon" />
      <span>bentoIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="warningIcon" />
      <span>warningIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="successIcon" />
      <span>successIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="failIcon" />
      <span>failIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="uploadIcon" />
      <span>uploadIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="deleteIcon" />
      <span>deleteIcon</span>
      </div>
    </div>
    <div class="flex items-center text-[10px]">
      <div class='w-20'>
      <CommonIcons :name="smallCheckIcon" />
      <span>smallCheckIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="plusIcon" />
      <span>plusIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="calendarIcon" />
      <span>calendarIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="clockIcon" />
      <span>clockIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="closeIcon" />
      <span>closeIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="downloadIcon" />
      <span>downloadIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="clipIcon" />
      <span>clipIcon</span>
      </div>
      <div class='w-20'>
      <CommonIcons :name="sendIcon" />
      <span>sendIcon</span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import CommonIcons from '@/components/CommonIcons.vue'
import {
  bentoIcon,
  calendarIcon,
  clipIcon,
  clockIcon,
  closeIcon,
  deleteIcon,
  downloadIcon,
  dropdownIcon,
  failIcon,
  hamburgerIcon,
  notifiacationIcon,
  plusIcon,
  sendIcon,
  smallCheckIcon,
  successIcon,
  uploadIcon,
  warningIcon
} from '@/constants/iconPath'
</script>
