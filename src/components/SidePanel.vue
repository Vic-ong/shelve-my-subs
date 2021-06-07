<template>
  <div class="h-full px-4 py-8 flex flex-col items-center shadow-md">
    <img
      :src="logo"
      class="h-8 w-8"
    >

    <div class="mt-10 space-y-4">
      <div
        class="cursor-pointer"
        @click="logout"
      >
        My Shelf
      </div>
    </div>

    <div
      class="mt-auto cursor-pointer"
      @click="logout"
    >
      Logout
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { logout } from '@/composables/firebase';
  import logo from '@/assets/logo.png';

  export default defineComponent({
    name: 'SidePanel',
    setup() {
      return {
        logo,
        logout,
      };
    },
  });
</script>
