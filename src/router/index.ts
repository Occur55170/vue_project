import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index.vue'),
    },
  ],
})

export default router
