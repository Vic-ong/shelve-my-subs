import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Shelf from '@/views/Shelf.vue';
import NewItem from '@/views/NewItem.vue';

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
  },
  {
    name: 'shelf/new',
    path: '/shelf/new',
    component: NewItem,
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
      if (localStorage.getItem('access_token') == null) {
        next({ name: 'auth' });
      } else {
        next();
      }
    } else if (to.path === '/auth' && !!localStorage.getItem('access_token')) {
      next({ name: 'home' });
    } else {
      next();
    }
  });

  app.use(router);
};
