<template>
  <div class="login">
    <loginPanel></loginPanel>
  </div>
</template>

<script setup lang="ts">
import loginPanel from './cpns/login-panel.vue'
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/img/login-bg.svg');
}
</style>
