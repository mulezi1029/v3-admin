<template>
  <div>Login</div>
  <el-button-group>
    <el-button type="primary" :icon="ArrowLeft">Previous Page</el-button>
    <el-button type="primary">
      Next Page<el-icon class="el-icon--right"><ArrowRight /></el-icon>
    </el-button>
  </el-button-group>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import hyRequest from '@/services'

hyRequest
  .get({
    url: '/home/multidata'
  })
  .then((res) => {
    console.log(res)
  })
</script>

<style scoped></style>
