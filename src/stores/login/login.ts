import { defineStore } from 'pinia'

import { getUserInfoById, getUserMenusByRole, loginAccount } from '@/services/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import mapMeunsToRoutes from '@/utils/mapMenus'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),

  actions: {
    async loginAccountAction(account: any) {
      // 1.账号登陆，获取登陆的 token 信息
      const loginData = await loginAccount(account)

      const id = loginData.data.id
      this.token = loginData.data.token
      localCache.setCatche(LOGIN_TOKEN, this.token) // 本地缓存token

      // 2.获取用户对应的详细信息：角色信息（role）
      const { data: userInfo } = await getUserInfoById(id)
      this.userInfo = userInfo

      // 3.根据角色获取对应的权限菜单数组
      const userMenuInfo = await getUserMenusByRole(this.userInfo.role.id)
      this.userMenus = userMenuInfo.data

      localCache.setCatche('userInfo', userInfo) //本地缓存用户登陆信息
      localCache.setCatche('userMenus', this.userMenus) //本地缓存用户菜单信息

      //难点：动态注册用户拥有的菜单对应的路由
      const routes = mapMeunsToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 4.登陆成功进行路由跳转
      router.push('/main')
    },

    loadLocalCacheAction() {
      // 1.用户刷新时加载数据
      const token = localStorage.getItem(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 2.动态添加路由
        const routes = mapMeunsToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
