<template>
  <div class="main">
    <!-- <el-button type="warning" @click="handleLogOut">退出登陆</el-button> -->
    <el-container class="main-content">
      <!-- 侧边栏 -->
      <el-aside width="200px" class="el-aside">Aside</el-aside>
      <!-- 内容 -->
      <el-container>
        <!-- 头部 -->
        <el-header class="el-header">Header</el-header>
        <!-- 主体 -->
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
    .el-aside {
      background-color: aqua;
    }
    .el-header {
      background-color: aquamarine;
    }
    .el-main {
      background-color: bisque;
    }
  }
}
</style>
