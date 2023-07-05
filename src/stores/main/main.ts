import { getAllDepartments, getAllRoles } from '@/services/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchAllDataAction() {
      const rolesResult = await getAllRoles()
      const departmentsRes = await getAllDepartments()

      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentsRes.data.list
    }
  }
})

export default useMainStore
