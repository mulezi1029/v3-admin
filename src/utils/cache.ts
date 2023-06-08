/*
 * 本文件对本地缓存两种api进行了通用的封装，可以自由选择使用何种本地缓存的api
 *
 */

//枚举缓存类型
enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCatche(key: string, value: any) {
    if (value !== undefined) {
      // console.log(value)
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
