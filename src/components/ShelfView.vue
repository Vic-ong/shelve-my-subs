<template>
  <div class="w-96 p-5 cursor-default rounded-md group transform duration-300 ease-in-out hover:bg-gray">
    <ItemView :data="data" />

    <div class="transition-all duration-500 ease-in-out opacity-0 h-0 group-hover:h-10 group-hover:opacity-100">
      <div class="flex justify-end space-x-4">
        <button @click="$router.push({ name: 'shelf/subs/edit/:id', params: { id: data.id } })">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ItemView from './ItemView.vue';

export default defineComponent({
  name: 'ShelfView',
  components: {
    ItemView,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
});
</script>

