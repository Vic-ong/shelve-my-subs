import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { user } from '@/composables/firebase';
import Home from '@/views/Home.vue';
import Shelf from '@/views/Shelf.vue';
import NewItem from '@/views/NewItem.vue';
import EditItem from '@/views/EditItem.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'shelf',
    path: '/shelf',
    component: Shelf,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'shelf/subs/new',
    path: '/shelf/subs/new',
    component: NewItem,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'shelf/subs/edit/:id',
    path: '/shelf/subs/edit/:id',
    component: EditItem,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'unkown-route',
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
    },
  },
];

export const registerRouter = (app: App): void => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!user.value) {
        next({ name: 'home' });
      } else {
        next();
      }
    } else if (to.path === '/' && !!user.value) {
      next({ name: 'shelf' });
    } else {
      next();
    }
  });

  app.use(router);
};
