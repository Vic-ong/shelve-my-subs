<template>
  <div class="h-full px-4 py-8 flex flex-col items-center shadow-md">
    <img
      :src="logo"
      class="h-12 w-12"
    >

    <div class="mt-10 space-y-4">
      <router-link
        v-for="item in items"
        :key="item.routeName"
        :to="{ name: item.routeName }"
        class="text-dark"
      >
        {{ item.name }}
      </router-link>
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
    const items = [
      {
        name: 'My Shelf',
        routeName: 'shelf',
      },
    ];

    return {
      logo,
      items,
      logout,
    };
  },
});
</script>
