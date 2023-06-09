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
    userInfo: {},
    userMenus: []
  }),

  actions: {
    async loginAccountAction(account: any) {
      // 1.账号登陆，获取登陆的 token 信息
      const loginData = await loginAccount(account)

      this.token = loginData.data.token
      const id = loginData.data.id

      // 2.本地缓存token
      localCache.setCatche(LOGIN_TOKEN, this.token)

      // 3.获取用户对应的详细信息：角色信息（role）
      const { data: userInfo } = await getUserInfoById(id)
      this.userInfo = userInfo

      // 4.根据角色获取对应的权限菜单数组
      const userMenuInfo = await getUserMenusByRole(this.userInfo.role.id)
      this.userMenus = userMenuInfo.data

      // 3.登陆成功进行路由跳转
      router.push('/main')
    }
  }
})

export default useLoginStore
