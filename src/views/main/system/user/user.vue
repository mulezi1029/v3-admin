<template>
  <div class="user">
    <user-search />
    <user-content @add-click="handleNewClick" @edit-click="handleEditClick" />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
import { ref, type Ref } from 'vue'

// 显示模态框：user-content中点击了新增用户或者点击了编辑时，都要显示模态框
const modalRef = ref<InstanceType<typeof UserModal>>() as Ref<InstanceType<typeof UserModal>>
const handleNewClick = () => {
  modalRef.value?.openModal()
}
const handleEditClick = (itemData: any) => {
  modalRef.value?.openModal(false, itemData)
}
</script>

<style scoped>
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
