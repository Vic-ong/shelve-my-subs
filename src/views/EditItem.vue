<template>
  <PageContainer>
    <div>
      <TitleContainer>
        <div>
          {{ data.name }} sub
        </div>
        <template #side-button>
          <OutlinedButton @click="$router.push({ name: 'shelf' })" />
        </template>
      </TitleContainer>

      <PageContainer :loading="loading">
        <div class="flex justify-center">
          <div class="w-96 space-y-10">
            <ItemView :data="data" />
            
            <div>
              todo: ability to adjust payment date and cost
            </div>

            <div class="flex justify-center">
              <button
                class="bg-error"
                @click="deleteHandler"
              >
                <div class="flex items-center">
                  Delete
                  <IconTrash class="h-4 w-4 fill-current text-light ml-2" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  </PageContainer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSubscriptions } from '@/composables/subscriptions';
import ItemView from '@/components/ItemView.vue';
import IconTrash from '@/components/Icons/IconTrash.vue';

export default defineComponent({
  name: 'EditItem',
  components: {
    ItemView,
    IconTrash,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { getSubscription, deleteSubscription } = useSubscriptions();
    const loading = ref(false);

    const data = getSubscription(route.params.id as string);

    const deleteHandler = async () => {
      loading.value = true;
      await deleteSubscription(route.params.id as string);
      loading.value = false;
      router.push({ name: 'shelf' });
    };

    return {
      loading,
      data,
      deleteHandler,
    };
  },
});
</script>
