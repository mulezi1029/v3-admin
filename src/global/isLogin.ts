import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from './constants'

export const isLogin = (to: any) => {
  // 只有登陆了，有token，才能进入
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path !== '/login' && !token) {
    return '/login'
  }
}
