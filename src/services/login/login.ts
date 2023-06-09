import type { IAccount } from '@/types/login'
import hyRequest from '..'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

export function loginAccount(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: localCache.getCache(LOGIN_TOKEN)
    // } //携带token ：优化，放在拦截器中
  })
}

export function getUserMenusByRole(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
