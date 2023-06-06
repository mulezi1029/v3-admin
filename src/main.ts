import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import pinia from './stores'

import 'normalize.css'
import '@/assets/less/index.less'

// // 全局完整引入 element-plus
// import ElementPlus from 'element-plus'
// // 导入所有组件的样式
// import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(router)
app.use(pinia)

// app.use(ElementPlus) //注册后，就可以在任何地方使用组件库的组件了

app.mount('#app')
