<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleAddClick">新增用户</el-button>
    </div>
    <div class="table">
      <el-table border :data="userList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="realname" label="真实姓名" width="150" />
        <el-table-column prop="enable" label="状态" width="120">
          <!-- 需要拿到属性值 enable，但这是el-table组件内部遍历，想要在外面拿到， 要使用作用域插槽  -->
          <template #default="{ row }">
            <el-button size="small" plain :type="row.enable ? 'primary' : 'danger'">
              {{ row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="cellphone" label="手机号码" />
        <el-table-column prop="createAt" label="创建时间">
          <template #default="{ row }">
            {{ formatUTC(row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间">
          <template #default="{ row }">
            {{ formatUTC(row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" text icon="Edit" @click="handleEditClick(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" text icon="Delete" @click="handleDelete(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagnation">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import userSystemStore from '@/stores/main/system/system'

import { usePageDataList, useDeleteUserById } from '../comprosables/useTableList'

// 自定义事件
const emit = defineEmits(['add-click', 'edit-click'])

// 1.调用action，store中发起请求userList数据
const systemStore = userSystemStore()

// 2.获取数据: 进入页面获取初始数据
usePageDataList()

const { userList, totalCount } = storeToRefs(systemStore)

// 3.分页
const currentPage = ref(1)
const pageSize = ref(10)

// 改变每页显示数据条数时重新获取数据渲染
const handleSizeChange = () => {
  usePageDataList(currentPage.value, pageSize.value)
}
// 跳转到指定页码时获取指定页码的数据渲染
const handleCurrentChange = () => {
  usePageDataList(currentPage.value, pageSize.value)
}

// 4.删除/新增/编辑操作
const handleDelete = (id: number) => {
  useDeleteUserById(id)
}
const handleAddClick = () => {
  emit('add-click')
}
const handleEditClick = (itemData: any) => {
  emit('edit-click', itemData)
}
</script>

<style scoped lang="less">
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .el-table {
    :deep(.el-table__cell) {
      text-align: center;
      padding: 10px 0;
    }

    :deep(.el-button--small) {
      padding: 5px 8px;
    }
  }

  .pagnation {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
