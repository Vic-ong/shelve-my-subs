<template>
  <div>
    <div
      v-if="status.loading"
      class="h-1/2 flex justify-center items-center"
    >
      <Loader />
    </div>
    <div
      v-else-if="status.error"
      class="h-1/2 flex justify-center items-center text-center"
    >
      <div class="max-w-md flex flex-col space-y-3">
        <div class="flex justify-center items-center space-x-3">
          <IconWarning class="h-5 w-5 fill-current text-error" />
          <span class="heading-2">
            Internal Error
          </span>
        </div>
        <div>
          <div>
            Apologies for the unexpected error 😰
          </div>
          <div>
            Please contact
            <a href="mailto:vickyocc53@gmail.com">
              vickyocc53@gmail.com
            </a>
            for assistance.
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex">
        <div
          v-if="route.name !== 'home'"
          class="h-screen w-52"
        >
          <SidePanel />
        </div>
        <div class="h-screen w-full px-10 py-8 overflow-y-auto">
          <router-view v-slot="{ Component, route }">
            <transition
              name="fade"
              mode="out-in"
            >
              <component
                :is="Component"
                :key="route.path"
                class="h-full w-full"
              />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth, user } from '@/composables/firebase';
import IconWarning from '@/components/Icons/IconWarning.vue';
import Loader from '@/components/Loader.vue';
import SidePanel from '@/components/SidePanel.vue';

export default defineComponent({
  name: 'App',
  components: {
    IconWarning,
    Loader,
    SidePanel,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const status = reactive({
      loading: true,
      error: false,
    });

    auth.onAuthStateChanged((firebaseUser) => {
      status.loading = false;
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

<style>
  /* Fade transition */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  /* Bounce transition */
  .bounce-enter-active {
    animation: bounce-in .35s;
  }
  .bounce-leave-active {
    animation: bounce-in .2s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
