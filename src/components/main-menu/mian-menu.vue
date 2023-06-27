<template>
  <div class="main-menu">
    <!-- logo与标题 -->
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!collapse">后台管理系统</h2>
    </div>

    <!-- 菜单 -->
    <div class="menu">
      <el-menu
        :default-active="userMenus[0].children[0].id"
        :collapse="collapse"
        background-color="#001529"
        text-color="#b7bdc3"
        active-text-color="#fff"
      >
        <!-- 2. 遍历菜单数组，渲染出菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id">
            <!-- 标题 -->
            <template #title>
              <el-icon>
                <!-- 图标 -->
                <component :is="item.icon.split('el-icon')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <!-- 子菜单项 -->
            <template v-for="menu in item.children" :key="menu.id">
              <el-menu-item :index="menu.id">{{ menu.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <!-- 1. 静态菜单结构 -->
        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item index="1-1">核心技术</el-menu-item>
          <el-menu-item index="1-2">商品统计 </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="2-1">用户管理</el-menu-item>
          <el-menu-item index="2-2">部门管理 </el-menu-item>
          <el-menu-item index="2-3">菜单管理 </el-menu-item>
          <el-menu-item index="2-4">角色管理 </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><ShoppingBag /></el-icon>
            <span>商品中心</span>
          </template>
          <el-menu-item index="3-1">商品类别</el-menu-item>
          <el-menu-item index="3-2">商品信息 </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>
            <el-icon><ChatLineRound /></el-icon>
            <span>随便聊聊</span>
          </template>
          <el-menu-item index="4-1">你的故事</el-menu-item>
          <el-menu-item index="4-2">故事列表 </el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'

defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
</script>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    overflow: hidden;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;

    height: 24px;
    padding: 15px 12px 8px 10px;

    img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      color: white;
      font-size: 18px;
      font-weight: normal;
      white-space: nowrap;
    }
  }

  .el-menu {
    border-right: none;
    user-select: none; //阻止双击选中文本显示高亮

    .el-sub-menu {
      .el-menu-item {
        padding-left: 50px;
        background-color: #0c2135;
      }
      .el-menu-item:hover {
        color: #fff;
      }
      .el-menu-item.is-active {
        background-color: #0a60bd;
      }
    }
  }
}
</style>
