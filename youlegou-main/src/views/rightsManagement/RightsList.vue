<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import type { TableColumnCtx, TableInstance } from "element-plus";
// Vue实例
const Vue: any = getCurrentInstance();
// Vue实例上的axios
const Axios = Vue.appContext.config.globalProperties.$axios;

interface User {
  date: string;
  name: string;
  address: string;
  tag: string;
}

const tableRef = ref<TableInstance>();

const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address;
};

const tableData: User[] = [
  {
    date: "1",
    name: "商品名称",
    address: "goods",
    tag: "一级",
  },
  {
    date: "2",
    name: "商品名称",
    address: "goods",
    tag: "二级",
  },
  {
    date: "3",
    name: "商品名称",
    address: "goods",
    tag: "三级",
  },
  {
    date: "4",
    name: "商品名称",
    address: "goods",
    tag: "一级",
  },
];

Axios({
  mehtod:'get',
  url:'rights',
  params:{
    type:'list'
  }
}).then((res: any)=>{
  console.log(res,123);
})
</script>

<template>
  <div class="box">
    <el-table
      ref="tableRef"
      row-key="date"
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column prop="date" label="#" width="180" />
      <el-table-column prop="name" label="权限名称" />
      <el-table-column prop="address" label="路径" :formatter="formatter" />

      <el-table-column prop="tag" label="权限等级">
        <template #default="scope">
          <el-tag
            v-if="scope.row.tag == '一级'"
            type="primary"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
          <el-tag
            v-if="scope.row.tag == '二级'"
            type="success"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
          <el-tag
            v-if="scope.row.tag == '三级'"
            type="warning"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
