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
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="accountForm.pwd" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
// 1.定义账户登陆的数据
const accountForm = reactive({
  account: '',
  pwd: ''
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
  pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '密码为6位以上数字字母组成，且第一位位大写字母',
      trigger: 'blur'
    }
  ]
}

// 3.登陆逻辑
const accountFormRef = ref<InstanceType<typeof ElForm>>() //获取表单

function loginAction() {
  accountFormRef.value?.validate(() => {})
  console.log(accountForm.account, accountForm.pwd)
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
