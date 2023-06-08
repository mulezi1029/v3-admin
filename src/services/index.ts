import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      config.headers!.Authorization = 'Bearer' + localCache.getCache(LOGIN_TOKEN)
      return config
    }
  }
})

export default hyRequest
