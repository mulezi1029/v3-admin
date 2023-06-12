import { defineStore } from 'pinia'

import { getUserInfoById, getUserMenusByRole, loginAccount } from '@/services/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localStorage.getItem(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
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
      localCache.setCatche('userInfo', userInfo) //本地缓存用户登陆信息

      // 3.根据角色获取对应的权限菜单数组
      const userMenuInfo = await getUserMenusByRole(this.userInfo.role.id)
      this.userMenus = userMenuInfo.data
      localCache.setCatche('userMenus', this.userMenus) //本地缓存用户菜单信息

      // 4.登陆成功进行路由跳转
      router.push('/main')
    }
  }
})

export default useLoginStore
