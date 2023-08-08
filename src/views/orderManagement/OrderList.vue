<template>
  <div class="box">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item class="form-in">
        <el-input
          v-model="formInline.user"
          placeholder="Approved by"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="info" plain @click="onSubmit"
          ><i class="iconfont icon-sousuo"></i
        ></el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-if="isShow"
      :data="tableData.goods"
      :border="parentBorder"
      style="width: 100%"
    >
      <el-table-column label="#" prop="index" width="50" />
      <el-table-column label="订单编号" prop="order_number" width="auto" />
      <el-table-column label="商品价格（元）" prop="order_price" />
      <el-table-column label="是否付款" prop="order_pay" />
      <el-table-column label="是否发货" prop="is_send" />
      <el-table-column label="创建时间" prop="update_time" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[5, 10, 15, 20]"
        default-page-size:="5"
        :small="small"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, getCurrentInstance, onMounted } from "vue";

const Vue: any = getCurrentInstance();

const Axios = Vue.appContext.config.globalProperties.$axios;

const formInline = reactive({
  user: "",
  region: "",
  date: "",
});


const onSubmit = () => {};

// 表格
const parentBorder = ref(false);
let isShow = ref(false);
let tableData: any = reactive([]);

const handleDelete = (index, row) => {
  console.log(index, row.user_id);
  Axios({
    mehtod: "delete",
    url: "orders/:id",
    params: {
      id: row.user_id,
    },
  }).then((res: any) => {
    console.log(res);
  });
};

// 分页
const currentPage4 = ref(1);
const pageSize4 = ref(5);
const small = ref(false);
const background = ref(false);
// 切换当前显示数量
const handleSizeChange = (val: number) => {
  isShow.value = false;
  Axios({
    mehtod: "get",
    url: "orders",
    params: {
      query: "",
      pagenum: "1",
      pagesize: val,
    },
  }).then((res: any) => {
    console.log(res.data.data);
    tableData = res.data.data;
    isShow.value = true;
  });
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
const abc = () => {
  Axios({
    mehtod: "get",
    url: "orders",
    params: {
      query: "",
      pagenum: "1",
      pagesize: pageSize4.value,
    },
  }).then((res: any) => {
    console.log(res.data.data);
    tableData = res.data.data;
    isShow.value = true;
  });
};
onMounted(() => {
  abc();
});
</script>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
@font-face {
  font-family: "iconfont"; /* Project id 4116330 */
  src: url("//at.alicdn.com/t/c/font_4116330_qurf7grxzn.woff2?t=1687850743277")
      format("woff2"),
    url("//at.alicdn.com/t/c/font_4116330_qurf7grxzn.woff?t=1687850743277")
      format("woff"),
    url("//at.alicdn.com/t/c/font_4116330_qurf7grxzn.ttf?t=1687850743277")
      format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-sousuo:before {
  content: "\e651";
}
.form-in {
  margin-right: 0 !important;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.demo-form-inline {
  text-align: left !important;
  margin-top: 20px;
}
:deep(td.el-table__cell.el-table__expanded-cell) {
  padding-left: 20px !important;
}
</style>
