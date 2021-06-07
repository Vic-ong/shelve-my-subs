<template>
  <PageContainer
    :loading="status.loading"
    :error="status.error"
  >
    <div>
      <div class="flex justify-between items-center space-x-5">
        <div class="heading">
          New Item
        </div>

        <div>
          <button
            class="bg-transparent text-primary border shadow-none"
            @click="router.push({ name: 'shelf' })"
          >
            <div class="flex">
              <i class="mr-2 fi-sr-angle-small-left" />
              Back
            </div>
          </button>
        </div>
      </div>

      <div class="mt-10 space-y-5">
        <div>
          <div class="mb-2">
            Subscription
          </div>
          <select v-model="input.name">
            <option
              v-for="item in names"
              :key="item"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>

        <div>
          <div class="mb-2">
            Cost (US$)
          </div>
          <input
            v-model="inputCost.value"
            type="text"
            placeholder="14.99"
          >
        </div>

        <div>
          <div class="mb-2">
            Recurrence
          </div>
          <select v-model="input.recurrence">
            <option
              v-for="item in recurrences"
              :key="item"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>


        <div>
          <div class="mb-2">
            When is the upcoming payment?
          </div>
          <DatePicker
            v-model="input.payment_date"
            :min-date="new Date()"
          />
        </div>

        <div>
          <button
            :class="!validInput ? 'bg-gray text-gray-darken cursor-default pointer-events-none' : ''"
            @click="submitHandler"
          >
            <div class="flex">
              Add
              <i class="ml-2 fi-sr-add" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { DatePicker } from 'v-calendar';
  import { user } from '@/composables/firebase';
  import { useSubscriptions } from '@/composables/subscriptions';

  export default defineComponent({
    name: 'NewItem',
    components: {
      DatePicker,
    },
    setup() {
      const router = useRouter();
      const { addSubscription } = useSubscriptions();
      const status = reactive({
        loading: false,
        error: false,
      });
      const input = reactive({
        name: '',
        recurrence: 'monthly',
        payment_date: new Date(),
      });
      const inputCost = reactive({
        currency: 'USD',
        dollar: '$',
        value: '',
      });

      const names = ['Netflix', 'Disney Plus', 'iCloud', 'Google Storage', 'Spotify', 'Adobe Creative Suite'];
      const recurrences = ['monthly'];

      watch(inputCost, () => {
        if (inputCost.value.includes('.')) {
          inputCost.value = inputCost.value.split('.')[0] + '.' + inputCost.value.split('.')[1].slice(0, 2);
        }
      });

      const validInput = computed(() => !!input.name && !!input.recurrence && !!input.payment_date && !!inputCost.value);

      const submitHandler = async () => {
        if (user.value && validInput.value) {
          try {
            status.loading = true;
            const data = {
              user_id: user.value.uid,
              name: input.name,
              cost: {
                currency: inputCost.currency,
                dollar: inputCost.dollar,
                value: Number(inputCost.value),
              },
              recurrence: input.recurrence,
              payment_date: input.payment_date,
            };
            await addSubscription(data);
            router.push({ name: 'shelf' });
            status.loading = false;
          } catch (err) {
            status.loading = false;
            status.error = true;
          }
        }
      };

      return {
        status,
        router,
        submitHandler,
        validInput,
        input,
        inputCost,
        names,
        recurrences,
      };
    },
  });
</script>
