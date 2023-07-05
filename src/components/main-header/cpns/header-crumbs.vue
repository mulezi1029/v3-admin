<template>
  <!-- 面包屑 -->
  <div class="breadcrubs">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrubs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { mapPathToBreadCrumbs } from '@/utils/mapMenus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrubs = computed(() => {
  return mapPathToBreadCrumbs(route.path, userMenus)
})
</script>

<style scoped lang="less"></style>
