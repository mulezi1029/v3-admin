import { defineStore } from 'pinia'

import { loginAccount } from '@/services/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localStorage.getItem('token') ?? '',
    name: ''
  }),

  actions: {
    async loginAccountAction(account: any) {
      // 账号登陆，获取 token信息
      const loginData = await loginAccount(account)

      this.id = loginData.data.id
      this.token = loginData.data.token
      this.name = loginData.data.name

      // 2.本地缓存token
      localCache.setCatche('token', this.token)

      // 3.登陆成功进行路由跳转
      router.push('/main')
    }
  }
})

export default useLoginStore
