import type { RouteRecordRaw } from 'vue-router'

/**
 *
 * @returns 本地存在的所有页面对应的所有路由
 */
function loadLocalRoutes() {
  // 动态获取本地所有路由对象，存在数组中
  const localRoutes: RouteRecordRaw[] = []

  // 1.1 读取router/main下所有的ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })

  // 2.2 遍历文件，将路由保存
  for (const key in files) {
    const module = files[key]
    const route = module.default
    localRoutes.push(route)
  }

  return localRoutes
}

/**
 * @abstract：当前用户具备的所有路由的第一条路由对应的菜单
 */
let firstMenuItem: any = null

/**
 * @description 将路径匹配为对应的菜单
 * @param path 需要匹配的路径
 * @param userMenus 当前登陆用户具有的所有菜单
 * @returns 与路径匹配的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) return subMenu
    }
  }
}

/**
 * @description 根据当前路径，匹配对应的一级菜单与二级菜单
 * @param path
 * @param userMenus
 * @returns 面包屑
 */
export function mapPathToBreadCrumbs(path: string, userMenus: any[]) {
  const breadcrumbs = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 *
 * @param userMenus 当前登陆用户具有的所有菜单（菜单是一级一级的）
 * @returns  当前登陆用户所具有的所有路由，用于动态注册
 */
export default function mapMeunsToRoutes(userMenus: any) {
  // 1. 加载本地所有路由
  const localRoutes = loadLocalRoutes()

  // 2.根据用户具有的菜单在本地所有路由中匹配应该动态注册的路由，存放在 routes数组
  const routes: RouteRecordRaw[] = []

  // 匹配过程： 2.1 遍历菜单，在本地所有路由中找到菜单路径与路由路径相等的路由
  //          2.2 注册一级菜单的路由，重定向至第一个二级菜单
  //          2.3 注册二级菜单的路由
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      // 匹配菜单路径对应的路由
      const route = localRoutes.find((item) => item.path === subMenu.url)

      if (route) {
        // 1.注册顶层一级菜单对应的路由，重定向至第一个二级路由
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 2.二级菜单路由
        routes.push(route)
      }

      // 记录第一个被匹配到的菜单
      if (!firstMenuItem && route) firstMenuItem = subMenu
    }
  }

  return routes
}

export { firstMenuItem }
