<script setup lang="ts">
import { reactive, ref, getCurrentInstance, onUpdated, onMounted } from "vue";
import router from "../../router";
// Vue实例
const Vue: any = getCurrentInstance();
// Vue实例上的axios
const Axios = Vue.appContext.config.globalProperties.$axios;
// http://127.0.0.1:8888/api/private/v1/
// 表单
const formInline = reactive({
  user: "",
  region: "",
  date: "",
});

const onSubmit = () => {
  
};
const addData = () => {
  router.push('/dataView')  
};

// 表格
const parentBorder = ref(false);
const childBorder = ref(false);
let isShow = ref(false);
let tableData: any = reactive([]);

const handleDelete = (index, row) => {
  console.log(index, row.goods_id);
  Axios({
    mehtod: "delete",
    url: "goods/:id",
    params: {
      id: row.goods_id,
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
    url: "goods",
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
    url: "goods",
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
        <el-button type="primary" @click="addData">添加商品</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-if="isShow"
      :data="tableData.goods"
      :border="parentBorder"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div m="4">
            <p m="t-0 b-2">商品名称 {{ props.row.goods_name }}</p>
            <p m="t-0 b-2">价格 {{ props.row.goods_price }}</p>
            <p m="t-0 b-2">库存 {{ props.row.goods_number }}</p>
            <p m="t-0 b-2">重量 {{ props.row.goods_weight }}</p>
            <p m="t-0 b-2">商品状态 已审核</p>
            <p m="t-0 b-2">热销商品数量 {{ props.row.hot_mumber }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="#" prop="goods_id" width="50" />
      <el-table-column label="商品名称" prop="goods_name" width="auto" />
      <el-table-column label="商品价格（元）" prop="goods_price" />
      <el-table-column label="商品重量（克）" prop="goods_weight" />
      <el-table-column label="创建时间" prop="" />
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
