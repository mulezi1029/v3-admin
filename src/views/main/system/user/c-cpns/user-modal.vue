<template>
  <div class="newUserModal">
    <el-dialog v-model="visible" title="新增用户" width="30%" :show-close="false" :center="true">
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item prop="name" label="用户名">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="realname" label="真实姓名">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item prop="password" label="密码" v-if="isCreateNewRef">
            <el-input v-model="formData.password" placeholder="密码" show-password />
          </el-form-item>
          <el-form-item prop="cellphone" label="手机号码">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item prop="roleId" label="选择角色">
            <el-select v-model="formData.roleId" style="width: 100%" placeholder="请选择角色">
              <template v-for="role in entireRoles" :key="role.id">
                <el-option :label="role?.name" :value="role?.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item prop="departmentId" label="选择部门">
            <el-select v-model="formData.departmentId" style="width: 100%" placeholder="请选择部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeModal">取消</el-button>
          <el-button @click="handleConfirmClick" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { useCreateUserData, useUpdateUserData } from '../comprosables/useTableList'

const visible = ref(false)
const isCreateNewRef = ref(true)

const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

const editDat = ref()

// 获取roles与departments数据

const mainStore = useMainStore()
mainStore.fetchAllDataAction()

const { entireRoles, entireDepartments } = storeToRefs(mainStore)

//显示/关闭模态框
const openModal = (isCreateNew: boolean = true, itemData?: any) => {
  visible.value = true
  isCreateNewRef.value = isCreateNew

  if (!isCreateNew && itemData) {
    // 编辑：数据回显
    for (let key in formData) {
      formData[key] = itemData[key]
    }
    editDat.value = itemData
  } else {
    // 新增
    for (let key in formData) {
      formData[key] = ''
    }
    editDat.value = null
  }
}

const closeModal = () => {
  visible.value = false
}

// 模态框确定逻辑
const handleConfirmClick = () => {
  visible.value = false
  if (!isCreateNewRef.value && editDat) {
    useUpdateUserData(editDat.value.id, formData)
  } else {
    useCreateUserData(formData)
  }
}

defineExpose({ openModal })
</script>

<style scoped lang="less"></style>
