<template>
  <PageContainer
    :loading="status.loading"
    :error="status.error"
  >
    <div class="min-h-screen flex flex-col justify-center items-center space-y-12">
      <div class="flex flex-col items-center space-y-4">
        <img
          :src="logo"
          class="h-20 w-20"
        >

        <div class="heading">
          shelve my subs
        </div>

        <div>
          A simple app that help organize your subscriptions and track its expenses.
        </div>
      </div>

      <div class="flex flex-col items-center space-y-2">
        <button @click="promptLogin">
          Create A Shelf / Login
        </button>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithGoogle } from '@/composables/firebase';
import logo from '@/assets/logo.png';

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    const status = reactive({
      loading: false,
      error: false,
    });

    const promptLogin = async () => {
      try {
        status.error = false;
        status.loading = true;
        const user = await signInWithGoogle();
        if (user) {
          router.push({ name: 'shelf' });
        }
        status.loading = false;
      } catch (err) {
        console.error(err);
        status.error = true;
      }
    };

    return {
      status,
      logo,
      promptLogin,
    };
  },
});
</script>
