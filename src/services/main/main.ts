import hyRequest from '..'

export const getAllRoles = () => {
  return hyRequest.post({
    url: 'role/list'
  })
}

export const getAllDepartments = () => {
  return hyRequest.post({
    url: 'department/list'
  })
}
