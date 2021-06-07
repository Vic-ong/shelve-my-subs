<template>
  <div class="flex">
    <div
      v-if="route.name !== 'home'"
      class="h-screen w-52"
    >
      <SidePanel />
    </div>
    <div class="h-screen w-full px-10 py-8 overflow-y-auto">
      <div v-if="route.name === 'home'">
        <router-view v-slot="{ Component }">
          <transition
            name="transition-fade"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

      <div v-else-if="!!user">
        <router-view v-slot="{ Component }">
          <transition
            name="transition-fade"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth, user } from '@/composables/firebase';
import SidePanel from '@/components/SidePanel.vue';

export default defineComponent({
  name: 'App',
  components: {
    SidePanel,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const status = reactive({
      loading: false,
      error: false,
    });

    // watch(user, () => {
    //   if (!user) {
    //     status.loading = true;
    //   } else {
    //     status.loading = false;
    //   }
    // });

    auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        router.push({ name: 'home' });
      } else if (!!firebaseUser && route.name === 'home') {
        router.push({ name: 'shelf' });
      }
    });

    return {
      status,
      user,
      route,
    };
  },
});
</script>
