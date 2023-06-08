import { defineStore } from 'pinia'

import { getUserInfoById, loginAccount } from '@/services/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: localStorage.getItem(LOGIN_TOKEN) ?? ''
  }),

  actions: {
    async loginAccountAction(account: any) {
      // 账号登陆，获取 token 信息
      const loginData = await loginAccount(account)

      console.log(loginData)
      const id = loginData.data.id
      this.token = loginData.data.token

      // 2.本地缓存token
      localCache.setCatche(LOGIN_TOKEN, this.token)

      // 3.获取用户对应的详细信息：角色信息（role）
      const userInfo = await getUserInfoById(id)
      console.log(userInfo)

      // 3.登陆成功进行路由跳转
      router.push('/main')
    }
  }
})

export default useLoginStore
