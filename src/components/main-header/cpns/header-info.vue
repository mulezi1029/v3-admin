<template>
  <div class="header-info">
    <!-- 1.小图标 -->
    <div class="operations">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <div class="dot"></div>
        <el-icon><ChatDotSquare /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>

    <!-- 2.头像信息 -->
    <div class="avatar">
      <el-dropdown>
        <span class="userIcon">
          <el-avatar
            :size="30"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />
          <span class="name">{{ account }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { localCache } from '@/utils/cache'

const account = localCache.getCache('account')
// 退出登陆逻辑
const handleExitClick = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
  .operations {
    display: flex;
    margin-right: 20px;

    span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;

      &:hover {
        background: #f2f2f2;
      }

      i {
        font-size: 20px;
      }
      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        width: 6px;
        height: 6px;
        background-color: red;
        border-radius: 100%;
      }
    }
  }
  .userIcon {
    display: flex;
    align-items: center;
    .name {
      margin-left: 4px;
    }
  }
}
</style>
