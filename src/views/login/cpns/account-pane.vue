<template>
  <div class="account-pane">
    <el-form
      :model="accountForm"
      :rules="accountRules"
      size="large"
      label-width="60px"
      class="demo-ruleForm"
      status-icon
      ref="accountFormRef"
    >
      <el-form-item label="帐号" prop="account">
        <el-input v-model="accountForm.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountForm.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

import type { IAccount } from '@/types/login'
import useLoginStore from '@/stores/login/login'

// 1.定义账户登陆的数据
const accountForm = reactive<IAccount>({
  account: '',
  password: ''
})
// 2.定义账户登陆校验规则
const accountRules: FormRules = {
  account: [
    {
      required: true,
      message: '请输入账号', //不符合规则时提示的文本
      trigger: 'blur' //触发时机
    },
    {
      pattern: /^[a-z0-9]{6,20}$/, //正则匹配
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '密码为6位以上数字字母组成',
      trigger: 'blur'
    }
  ]
}

// 3.登陆逻辑
const loginStore = useLoginStore()
const accountFormRef = ref<InstanceType<typeof ElForm>>() //获取表单

const loginAction = () => {
  // 验证输入的账号密码格式是否合法
  accountFormRef.value?.validate((isValid) => {
    if (isValid) {
      // 输入合法，获取用户输入的账号与密码
      const name = accountForm.account
      const password = accountForm.password

      // 向服务器发送请求，携带账号与密码
      loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage({
        showClose: true,
        message: '密码与账号错误，请检查账号与密码重新登陆~',
        type: 'error',
        duration: 2000
      }) //element-plus反馈组件的导入使用，需要进行额外的配置，导入样式
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
