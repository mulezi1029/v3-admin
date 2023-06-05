<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h2>App</h2>
  <RouterLink to="/login">登陆</RouterLink>
  <RouterLink to="/main">首页</RouterLink>
  <RouterView />
</template>

<style scoped></style>
