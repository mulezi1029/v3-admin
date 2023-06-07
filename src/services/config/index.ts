// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2.代码逻辑判断, 判断当前环境
// vite 默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)

let BASE_URL = ''
if (import.meta.env.DEV) {
  BASE_URL = 'http://123.207.32.32:5000'
} else {
  BASE_URL = 'http://coderwhy.prod:8000' //无效地址，仅为解释效果
}

// console.log(BASE_URL)

// 3.通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_NAME)
// console.log(import.meta.env.VITE_BASE_URL)

export const TIME_OUT = 10000
export { BASE_URL }
