<template>
  <div class="main-header">
    <div class="menu-icon">
      <el-icon size="28px" @click="handleMenuIconClick">
        <component :is="!isFold ? 'fold' : 'expand'" />
      </el-icon>
    </div>
    <div class="content">
      <header-crumbs />
    </div>
    <!-- 个人信息 -->
    <header-info />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['foldChange'])

const isFold = ref(false)

const handleMenuIconClick = () => {
  // 改变 fold 值
  isFold.value = !isFold.value

  // 发出自定义事件，将值传给父组件
  emits('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  flex: 1;
  display: flex;
  align-items: center;
  .menu-icon {
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 15px;
  }
}
</style>
