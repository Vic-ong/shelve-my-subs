/* eslint-disable vue/component-definition-name-casing */
import { App } from 'vue';
import PageContainer from '@/components/PageContainer.vue';
import TitleContainer from '@/components/TitleContainer.vue';
import OutlinedButton from '@/components/OutlinedButton.vue';

export const registerComponents = (app: App): void => {
  app.component('PageContainer', PageContainer);
  app.component('TitleContainer', TitleContainer);
  app.component('OutlinedButton', OutlinedButton);
};
