import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from './constants'

//路由跳转前进行判断是否已经登陆：本地是否已有token
export const isLogin = (to: any) => {
  // 只有登陆了，有token，才能进入
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path !== '/login' && !token) {
    return '/login'
  }
}
