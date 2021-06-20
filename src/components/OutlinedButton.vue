<template>
  <button class="bg-transparent text-primary border shadow-none">
    <slot>
      <div class="flex items-center">
        <IconAngleLeft class="h-4 w-4 fill-current text-primary mr-2" />
        Back
      </div>
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconAngleLeft from '@/components/Icons/IconAngleLeft.vue';

export default defineComponent({
  name: 'OutlinedButton',
  components: {
    IconAngleLeft,
  },
});
</script>
