import hyRequest from '@/services'

// 查
export const postuserListData = (queryInfo: any) => {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

// 删
export const deleteUserData = (id: number) => {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

// 增
export const createUserData = (dataInfo: any) => {
  return hyRequest.post({
    url: 'users',
    data: dataInfo
  })
}

// 改
export const updateUserData = (id: number, dataInfo: any) => {
  return hyRequest.patch({
    url: `users/${id}`,
    data: dataInfo
  })
}
