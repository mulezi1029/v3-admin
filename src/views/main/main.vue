<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 菜单侧边栏 -->
      <el-aside :width="isFold ? '64px' : '210px'" class="el-aside">
        <mian-menu :collapse="isFold"></mian-menu>
      </el-aside>

      <el-container>
        <el-header class="el-header">
          <mian-header @fold-change="handleFoldChange"></mian-header>
        </el-header>

        <el-main class="el-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isFold = ref(false)
const handleFoldChange = (flag: boolean) => {
  isFold.value = flag
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      text-align: left;
      scrollbar-width: none;
      transition: width 0.3s ease;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-header {
      display: flex;
      padding: 0 5px;
      // background-color: aquamarine;
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
