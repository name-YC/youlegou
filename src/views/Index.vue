<template>
  <div class="index">
    <Header />
    <div class="main">
      <Nav></Nav>
      <div class="cont">
        <div class="crumbs"><el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <!--面包屑列表-->
            <el-breadcrumb-item v-for='(item, index) in breadList' :key='index' @click.native="breadcrumb(item)"
              style="cursor: pointer">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>  </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MyIndex'
}
</script>

<script lang="ts" setup>
import Nav from '../components/Nav.vue'
import Header from '../components/Header.vue'
// @ts-ignore
import { useStore } from 'vuex'
// @ts-ignore
import { useRoute, useRouter } from 'vue-router'
// @ts-ignore
import { ref, watch } from 'vue'
const store = useStore()
const route = useRoute()
const router = useRouter()
const breadList = ref(store.state.breadListState)
// console.log(store, route, router, breadList.value)
// 面包屑数据处理
const getBreadcrumb = () => {
  // 由于本项目大部分属于‘一级’页面，所以在设置路由时候，一级页面不设置breadNumber = 1，‘二级’页面以上才设置breadNumber
  const breadNumber: any = typeof (route.meta.breadNumber) !== 'undefined' ? route.meta.breadNumber : 1
  // 获取当前页面的名字和路由，并组合成新的对象
  const newBread = { name: route.name, path: route.fullPath }
  let vuexBreadList = [] // 默认初始化面包屑数据
  if (breadNumber !== 1) {
    // 当前面包屑breadNumber大于1时才会从vuex中获取值
    vuexBreadList = store.state.breadListState // 获取breadList数组
  }
  if (breadNumber < vuexBreadList.length) {
    // "回退"面包屑----判断条件：当前路由breadNumber小于vuexBreadList的长度
    vuexBreadList.splice(breadNumber - vuexBreadList.length, vuexBreadList.length - breadNumber)
  }
  if (breadNumber > vuexBreadList.length) {
    // 添加面包屑----判断条件：当前路由breadNumber大于vuexBreadList的长度
    vuexBreadList.push(newBread)
  }
  // 处理完数据后，将最终的数据更新到vuex（用于页面刷新）
  store.commit('breadListMutations', vuexBreadList)
  // 处理完数据后，将最终的数据更新为新的面包屑数组
  breadList.value = vuexBreadList
}
// 面包屑点击事件
const breadcrumb = (item: any) => {
  console.log(item)
  router.push({
    path: item.path
  })
}
// 监听路由变化
watch(route, (newValue: object, oldValue: object | undefined) => {
  // console.log(typeof (newValue), newValue, oldValue)
  getBreadcrumb()
}, { immediate: true })

</script>

<style lang="less" scoped>
.index {
  // display: flex;
  min-height: 100vh;

  .main {
    display: flex;
    // flex: 1;
    min-height: calc(100vh - 75px);

    .cont {
      flex: 1;
      // width: calc(100vw - 250px);
      height: 100%;
      padding: 25px;
      background-color: #eaedf1;
      box-sizing: border-box;
    }
  }
}
</style>
