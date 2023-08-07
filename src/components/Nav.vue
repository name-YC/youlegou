<template>
  <div class="nav">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px" @click="handoff">
      <img src="/public/img/switch.png" ref="pic">
    </el-radio-group>
    <el-menu :router="true" default-active="active" class="el-menu-vertical-demo ns" :collapse="isCollapse"
      @open="handleOpen" @close="handleClose" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff">
      <el-menu-item index="/index/welCome">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>welCome</span>
      </el-menu-item>
      <el-sub-menu index="/index/userManagement">
        <template #title>
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/index/userManagement/userList">用户列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/index/rightsManagement">
        <template #title>
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/index/rightsManagement/RolesList">角色列表</el-menu-item>
        <el-menu-item index="/index/rightsManagement/rightsList">权限列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/index/goodsManagement">
        <template #title>
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/index/goodsManagement/goodsList">商品列表</el-menu-item>
        <el-menu-item index="/index/goodsManagement/classificationParameters">分类参数</el-menu-item>
        <el-menu-item index="/index/goodsManagement/productCategory">商品分类</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/index/orderManagement">
        <template #title>
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>订单管理</span>
        </template>
        <el-menu-item index="/index/orderManagement/orderList">商品列表</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/index/dataView">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>数据视图</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  HomeFilled, UserFilled
} from '@element-plus/icons-vue'
// 1.变量名称必须要与ref 命名的属性名称一致2.通过hello.value的形式获取 DOM 元素3.必须要在 DOM渲染完成后才可以获取 hello.value，否则就是null。
const pic: any = ref(null)
const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handoff = () => {
  isCollapse.value = !isCollapse.value
  console.log(isCollapse.value)
  if (isCollapse.value) {
    // console.log(pic.value.style)
    pic.value.style = "transform: rotate(180deg)"
  } else {
    pic.value.style = "transform: rotate(0deg)"
  }
}
onMounted(() => {
  // console.log(pic.value)
})
</script>

<style lang="less" scoped>
.nav {
  // width: 250px;
  height: calc(100vh - 75px);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  height: calc(100% - 30px);
}

/deep/ .el-menu--collapse {
  height: calc(100% - 30px);
}

/deep/.el-radio-group {
  height: 30px;
  background-color: #4a5064;
  margin-bottom: 0 !important;
  width: 100%;
  justify-content: center;
}
</style>

