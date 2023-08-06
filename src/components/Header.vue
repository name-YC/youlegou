<template>
  <div class="header">
    <div class="left">
      <img class="logo" src="/img/login.png" />
      <p>优乐美电商后台管理系统</p>
      <span>Version：0.0.0</span>
    </div>
    <div class="right">
      <div class="user">欢迎你：{{ username }}</div>
      <img class="fullScreen" src="/img/fullscreen.png" alt="">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="/img/user.gif" class="avatar" alt="">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>WelCome</el-dropdown-item>
            <el-dropdown-item @click="GoTo('/login')">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" >
export default {
  name: 'MyHeader'
}
</script>

<script lang="ts" setup>
// @ts-ignore
import { useRouter } from 'vue-router'
// @ts-ignore
import { ArrowDown } from '@element-plus/icons-vue'
// @ts-ignore
import { useStore } from 'vuex'
// vuex
const Store = useStore()
// Router
const Router = useRouter()
// 用户名
const username = Store.state.username

const GoTo = (path: string) => {
  Router.push(path)
  localStorage.removeItem('token')
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 75px;
  background-color: #373d41;

  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }

  .left {
    color: #fff;
    display: flex;
    align-items: center;

    p {
      padding-left: 14px;
      font-size: 24px;
    }

    span {
      padding-left: 6px;
    }

    .logo {
      height: 75px;
      width: 75px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .user {
      padding-right: 8px;
      color: #fff;
      font-size: 20px;
    }

    .fullScreen {
      width: 28px;
      height: 28px;
      padding-right: 8px;
    }

    /deep/.el-dropdown-link {
      display: flex;
      align-items: center;
    }

    .avatar {
      width: 56px;
      height: 56px;
      border-radius: 8px;
    }
  }
}
</style>