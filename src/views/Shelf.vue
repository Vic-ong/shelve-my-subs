<template>
  <PageContainer
    :loading="loading"
    :error="error"
  >
    <div>
      <TitleContainer>
        <div>
          My Shelf
        </div>
        <template #side-button>
          <button @click="$router.push({ name: 'shelf/subs/new' })">
            <div class="flex items-center">
              New
              <IconAdd class="h-4 w-4 fill-current text-light ml-2" />
            </div>
          </button>
        </template>
      </TitleContainer>

      <div>
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
          <div class="flex justify-center items-center text-left sm-below:flex-col sm-below:space-y-5 md-above:space-x-10">
            <div>
              <div class="heading font-default">
                {{ formatMoney(summary.total.value, summary.total.dollar) }}
              </div>
              <div class="mt-2 text-gray-darken text-right">
                Monthly expense
              </div>
            </div>

            <div>
              <div class="heading font-default">
                {{ formatMoney(summary.total.value * 12, summary.total.dollar) }}
              </div>
              <div class="mt-2 text-gray-darken text-right">
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
import { useSubscriptions } from '@/composables/subscriptions';
import { formatMoney } from '@/utils';
import IconAdd from '@/components/Icons/IconAdd.vue';
import ShelfView from '@/components/ShelfView.vue';

export default defineComponent({
  name: 'Shelf',
  components: {
    ShelfView,
    IconAdd,
  },
  setup() {
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
      subscriptions,
      summary,
      formatMoney,
    };
  },
});
</script>
