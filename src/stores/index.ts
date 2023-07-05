import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

function registerPinia(app: App<Element>) {
  app.use(pinia)

  // 刷新后加载本地数据
  useLoginStore().loadLocalCacheAction()
}

export default registerPinia
