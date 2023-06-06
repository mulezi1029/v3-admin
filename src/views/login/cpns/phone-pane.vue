<template>
  <div class="phone-pane">
    <el-form
      :model="phoneForm"
      :rules="phoneRules"
      ref="accountRef"
      size="large"
      label-width="60px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phoneForm.phone" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input class="codea" />
        <el-button type="primary" size="large">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const phoneForm = reactive({
  phone: ''
})
const phoneRules = {
  phone: [
    {
      prttern: /^1[3|4|5|7|8][0-9]{9}$/,
      message: '手机号格式不正确，请检查',
      trigger: 'blur'
    }
  ]
}
</script>

<style scoped lang="less">
.codea {
  width: 105px;
  margin-right: 20px;
}
</style>
