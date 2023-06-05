<template>
  <div>Login</div>
</template>

<script setup lang="ts">
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
