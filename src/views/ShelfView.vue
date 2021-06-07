<template>
  <div class="w-96 p-5 cursor-default rounded-md group transform duration-300 ease-in-out hover:bg-gray">
    <div class="flex">
      <div class="p-2 rounded-md shadow-md transform duration-300 ease-in-out group-hover:scale-110">
        <img
          :src="getImg(data.name)"
          class="h-12 w-12 object-cover"
        >
      </div>

      <div class="ml-5">
        <div class="font-bold">
          {{ data.name }}
        </div>
        <div class="text-gray-darken text-sm">
          {{ formatDate(data.payment_date) }}, {{ data.recurrence }}
        </div>
      </div>

      <div class="ml-auto">
        {{ data.cost.dollar }}{{ data.cost.value }}
      </div>
    </div>

    <div class="transition-all duration-500 ease-in-out opacity-0 h-0 group-hover:h-10 group-hover:opacity-100">
      <div class="flex justify-end space-x-4">
        <button>Edit</button>
        <button class="px-4 bg-error">
          <i class="fi-sr-trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import dayjs from 'dayjs';
  import netflixLogo from '@/assets/brand/netflix.png';
  import disneyplusLogo from '@/assets/brand/disney_plus.png';
  import appleLogo from '@/assets/brand/apple.png';
  import googleLogo from '@/assets/brand/google_drive.png';
  import spotifyLogo from '@/assets/brand/spotify.png';
  import adobeLogo from '@/assets/brand/creative_cloud.png';

  export default defineComponent({
    name: 'ShelfView',
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    setup() {
      const getImg = (name: string) => {
        switch(name) {
          case 'Netflix':
            return netflixLogo;
          case 'Disney Plus':
            return disneyplusLogo;
          case 'iCloud':
            return appleLogo;
          case 'Google Storage':
            return googleLogo;
          case 'Spotify':
            return spotifyLogo;
          case 'Adobe Creative Suite':
            return adobeLogo;
          default:
            return '';
        }
      };

      const formatDate = (date: Date) => dayjs(date).format('D MMM YYYY');

      return {
        getImg,
        formatDate,
      };
    },
  });
</script>

