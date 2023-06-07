import { createRouter, createWebHistory } from 'vue-router'

import { isLogin } from '@/global/isLogin'

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
      path: '/text',
      name: 'text',
      component: import('@/views/text/test.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: import('@/views/error/notFound.vue')
    }
  ]
})

// 路由导航守卫：路由跳转前进行判断是否已经登陆：本地是否已有token
router.beforeEach((to) => {
  return isLogin(to)
})
export default router
