import { createRouter, createWebHashHistory } from 'vue-router'

import { isLogin } from '@/global/isLogin'
import { firstMenuItem } from '@/utils/mapMenus'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      component: import('@/views/error/notFound.vue')
    }
  ]
})

// 路由导航守卫
router.beforeEach((to) => {
  // 登陆鉴权，未登陆导航到登陆页面
  if (isLogin(to)) return isLogin(to)

  // 登陆后默认显示的页面---登陆后默认显示匹配到的第一个菜单页面
  if (to.path === '/main') return firstMenuItem?.url
})
export default router
