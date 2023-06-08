<template>
  <div class="login-panel">
    <h1 class="title">后台管理</h1>
    <!-- 中间tabs切换 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeTab">
        <!-- 1.账号登陆的pane -->
        <el-tab-pane name="account">
          <!-- tab标签 -->
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <div class="text">帐号登陆</div>
            </div>
          </template>
          <!-- 输入框 -->
          <AccountPane ref="accountRef" />
        </el-tab-pane>
        <!-- 2.手机登陆的pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <div class="text">手机登陆</div>
            </div>
          </template>
          <PhonePane></PhonePane>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 密码控制 -->
    <div class="account-control">
      <el-checkbox v-model="isRememberPwd" label="记住密码" size="large" @change="handleRemClick" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <!-- 登陆按钮:点击实现登陆逻辑：调用对应登陆组件中的方法 -->
    <el-button class="login-btn" type="primary" @click="handleLoginBtn">立即登陆</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AccountPane from './account-pane.vue'
import PhonePane from './phone-pane.vue'
import { localCache } from '@/utils/cache'

const activeTab = ref('account')

const isRememberPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)

// 法一：
const handleRemClick = () => {
  localCache.setCatche('isRemPwd', isRememberPwd.value)
}

// 法二：
// watch(isRememberPwd, (newVal) => {
//   localCache.setCatche('isRemPwd', newVal)
// })

// 点击按钮登陆逻辑
const accountRef = ref<InstanceType<typeof AccountPane>>() //获取子组件实例
const handleLoginBtn = () => {
  if (activeTab.value === 'account') {
    accountRef.value?.loginAction(isRememberPwd.value) //调用子组件方法
  } else {
    console.log('phone登陆')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  .title {
    margin-bottom: 10px;
    text-align: center;
    font-size: 24px;
    color: gray;
  }
  .label {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      margin-left: 5px;
    }
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    height: 45px;
  }
}
</style>
