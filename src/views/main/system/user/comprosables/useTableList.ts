import useSystemStore from '@/stores/main/system/system'

const systemStore = useSystemStore()

// 分页控制获取列表数据
export const usePageDataList = (page: number = 1, pageSize: number = 10) => {
  const size = pageSize
  const offset = (page - 1) * size
  const pageInfo = { size, offset }
  systemStore.postUserListAction(pageInfo)
}

// 查询获取列表数据
export const useSearchDataList = (formData = {}) => {
  systemStore.postUserListAction(formData)
}

// 删除
export const useDeleteUserById = (id: number) => {
  systemStore.deleteUserListAction(id)
}

// 增
export const useCreateUserData = (dataInfo: any) => {
  systemStore.createUserDataAction(dataInfo)
}

// 改
export const useUpdateUserData = (id: number, dataInfo: any) => {
  systemStore.updateUserDataAction(id, dataInfo)
}
