<template>
  <div class="main">
    <!-- <el-button type="warning" @click="handleLogOut">退出登陆</el-button> -->
    <el-container class="main-content">
      <el-aside width="220px" class="el-aside">
        <mian-menu></mian-menu>
      </el-aside>

      <el-container>
        <el-header class="el-header">
          <mian-header></mian-header>
        </el-header>

        <el-main class="el-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()

// 退出登陆逻辑
const handleLogOut = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
  .main-content {
    height: 100%;
    .el-header {
      background-color: aquamarine;
    }
    .el-main {
      background-color: bisque;
    }
  }
}
</style>
