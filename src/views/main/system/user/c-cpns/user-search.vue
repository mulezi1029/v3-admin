<template>
  <div class="user-search">
    <el-form label-width="80" size="large" ref="formRef" :model="formData">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入查询用户名"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入查询姓名"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入查询的手机号码"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="formData.enable" placeholder="状态" style="width: 100%">
              <el-option label="可用" value="1" />
              <el-option label="不可用" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="formData.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="起始"
              end-placeholder="终止"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <div class="ctrlBtns">
              <el-button icon="Refresh" @click="resetClick(formRef)">重置</el-button>
              <el-button icon="Search" type="primary" @click="searchClick">查询</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { useSearchDataList } from '../comprosables/useTableList'
import { usePageDataList } from '../comprosables/useTableList'

const formData = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})

const formRef = ref<FormInstance>()

const resetClick = (formRef: FormInstance | undefined) => {
  formRef?.resetFields() //重置表单数据
  usePageDataList() //重新获取列表最新数据
}

const searchClick = () => {
  useSearchDataList(formData) //根据表单数据查询符合条件的数据
}
</script>

<style scoped lang="less">
.user-search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 12px 30px;
    margin-bottom: 0;
  }
  .ctrlBtns {
    text-align: right;
    padding-right: 35px;

    .el-button {
      // margin-right: 1px;
      --el-button-size: 34px;
    }
  }
}
</style>
