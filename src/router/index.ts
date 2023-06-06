import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: import('@/views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: import('@/views/error/notfound.vue')
    }
  ]
})

export default router
