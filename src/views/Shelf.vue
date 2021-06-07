<template>
  <PageContainer
    :loading="loading"
    :error="error"
  >
    <div>
      <div class="flex justify-between items-center space-x-5">
        <div class="heading">
          My Shelf
        </div>

        <div>
          <button @click="router.push({ name: 'shelf/new' })">
            <div class="flex">
              Add
              <i class="ml-2 fi-sr-add" />
            </div>
          </button>
        </div>
      </div>

      <div class="mt-10">
        <div
          v-if="!subscriptions.data || subscriptions.data.length === 0"
          class="h-72 flex justify-center items-center"
        >
          <div class="h-32 w-96 flex flex-col justify-center items-center space-y-5 bg-gray rounded-xl">
            <span>
              Your shelf is currently empty.
            </span>
          </div>
        </div>

        <div v-else>
          <div class="flex justify-center items-center sm-below:flex-col sm-below:space-y-5 md-above:space-x-10">
            <div class="text-center">
              <div class="heading">
                {{ summary.total.dollar }}{{ summary.total.value }}
              </div>
              <div class="mt-2 text-gray-darken">
                Monthly expense
              </div>
            </div>

            <div class="text-center">
              <div class="heading">
                {{ summary.total.dollar }}{{ summary.total.value * 12 }}
              </div>
              <div class="mt-2 text-gray-darken">
                Yearly expense
              </div>
            </div>
          </div>

          <div class="mt-10 flex flex-col items-center">
            <ShelfView
              v-for="item in subscriptions.data"
              :key="item.id"
              :data="item"
            />
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSubscriptions } from '@/composables/subscriptions';
  import ShelfView from './ShelfView.vue';

  export default defineComponent({
    name: 'Shelf',
    components: {
      ShelfView,
    },
    setup() {
      const router = useRouter();
      const { subscriptions, getSubscriptions } = useSubscriptions();

      getSubscriptions();

      const loading = computed(() => subscriptions.loading);
      const error = computed(() => subscriptions.error);

      const summary = computed(() => ({
        total: {
          currency: 'USD',
          dollar: '$',
          value: Math.round(subscriptions.data.reduce((acc, curr) => acc += curr.cost.value, 0) * 100) / 100,
        },
      }));

      return {
        loading,
        error,
        router,
        subscriptions,
        summary,
      };
    },
  });
</script>
