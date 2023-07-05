import {
  createUserData,
  deleteUserData,
  postuserListData,
  updateUserData
} from '@/services/main/system/system'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

interface ISystemState {
  userList: any[]
  totalCount: number
}
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    totalCount: 0
  }),
  actions: {
    // 查
    async postUserListAction(queryInfo: any) {
      const userListRes = await postuserListData(queryInfo)
      if (userListRes.code !== 0) {
        return ElMessage({
          message: `${userListRes.data}`,
          type: 'error',
          duration: 1000
        })
      } else {
        const { totalCount, list } = userListRes.data
        this.userList = list
        this.totalCount = totalCount
      }
    },

    // 删
    async deleteUserListAction(id: number) {
      // 访问删除接口
      const deleteRes = await deleteUserData(id)
      if (deleteRes.code !== 0) {
        return ElMessage({
          message: `${deleteRes.data}`,
          type: 'error',
          duration: 1000
        })
      } else {
        // 删除成功后，刷新列表
        this.postUserListAction({ offset: 0, size: 10 })
      }
    },

    // 增
    async createUserDataAction(dataInfo: any) {
      const createRes = await createUserData(dataInfo)
      if (createRes.code !== 0) {
        return ElMessage({
          message: `${createRes.data}`,
          type: 'error',
          duration: 1000
        })
      } else {
        this.postUserListAction({ offset: 0, size: 10 })
      }
    },

    // 改
    async updateUserDataAction(id: number, dataInfo: any) {
      const updateRes = await updateUserData(id, dataInfo)
      if (updateRes.code !== 0) {
        return ElMessage({
          message: `${updateRes.data}`,
          type: 'error',
          duration: 1000
        })
      } else {
        this.postUserListAction({ offset: 0, size: 10 })
      }
    }
  }
})

export default useSystemStore
