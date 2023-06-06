<template>
  <div>
    <el-scrollbar height="400px">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
