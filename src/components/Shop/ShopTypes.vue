<template>
  <div class="shopTypes">
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加分类 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <!-- columns 表格各列的配置 -->
      <!-- selection-type 是否为多选类型表格 -->
      <!-- expand-type 是否为展开行类型-->
      <!-- <tree-table :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" show-index
        index-text="#" :show-row-hover="false" border>
        是否有效
        <template slot="isok" #default="scope">
          <i v-if="scope.row.cat_deleted === false" class="el-icon-success"
            style="color: lightgreen; font-size: 22px"></i>
          <i v-else class="el-icon-error" style="color: red; font-size: 22px"></i>

          排序
          <template slot="order" #default="scope">
            <el-tag effect="dark" v-if="scope.row.cat_level === 0" type="primaruy">一级</el-tag>
            <el-tag effect="dark" v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
            <el-tag effect="dark" v-else type="warning">三级</el-tag>
          </template>

          操作
          <template slot="opt" #default="scope">
            <el-button type="primary" icon="el-icon-edit" @click="showEditDiealog(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="removeCateByID(scope.row)">删除</el-button>
          </template>
        </template>
      </tree-table> -->

      <el-table :data="cateList" :columns="columns" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column label="#">
          <template #default='scope'>
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="">
          <template slot="isok" #default="scope">
            <!-- <i v-if="scope.row.cat_deleted === false" class="el-icon-success"
              style="color: lightgreen; font-size: 22px"></i> -->
            <!-- <i v-else class="el-icon-error" style="color: red; font-size: 22px"></i> -->
            <el-icon v-if="scope.row.cat_deleted === false" style="color: lightgreen; font-size: 22px">
              <SuccessFilled />
            </el-icon>
            <el-icon v-else style="color: red; font-size: 22px">
              <CircleCloseFilled />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column>
          <!-- 排序 -->
          <template slot="order" #default="scope">
            <el-tag effect="dark" v-if="scope.row.cat_level === 0" type="primaruy">一级</el-tag>
            <el-tag effect="dark" v-else-if="scope.row.cat_level === 1" type="success">二级</el-tag>
            <el-tag effect="dark" v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column>
          <!-- 操作 -->
          <template slot="opt" #default="scope">
            <el-button type="primary" :icon="Edit" @click="showEditDiealog(scope.row)">编辑</el-button>
            <el-button type="danger" :icon="Delete" @click="removeCateByID(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[3, 5, 7, 10]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" v-model="addCateDialogVisible" @close="addCateDialogClose" width="40%">
      <!-- 添加分类的表单 -->
      <el-form :model="AddCateForm" :rules="formRules" ref="addCateFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="AddCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- options 用来指定数据源 -->
          <!-- props 用来指定配置对象 -->
          <el-cascader placeholder="默认添加至一级分类" change-on-select v-model="selectedKeys" :options="ParentCateList"
            :props="cascaderProps" @change="cateParentChange" clearable></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑分类对话框 -->
    <el-dialog title="编辑分类对话框" v-model="editDialogVisible" width="40%" @close="editFormDialogClose">
      <el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="80px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit, Delete } from '@element-plus/icons-vue'
import request from '../../router/request'

// ref实例
const addCateFormRef = ref<FormInstance>()
const editFormRef = ref<FormInstance>()
// 商品分类的数据列表，默认为空
const cateList = ref([])
// 查询条件
const queryInfo = reactive({
  type: 3,
  pagenum: 1, //页码
  pagesize: 5, //每页显示多少条数据
})

// 总数据条数
const total = ref(0)
// 为table指定列的定义
const columns = reactive([
  {
    label: "分类名称",
    prop: "cat_name",
  },
  {
    label: "是否有效",
    // 表示当前列定义为模板列
    type: "template",
    // 定义模板名称
    template: "isok",
  },
  {
    label: "级别",
    type: "template",
    template: "order",
  },
  {
    label: "操作",
    type: "template",
    template: "opt",
    width: "200px",
  },
])
// 控制添加分类对话框的显示与隐藏
const addCateDialogVisible = ref(false)
// 添加分类的表单数据对象
const AddCateForm = reactive({
  // 分类的名称
  cat_name: '',
  //父级分类的id
  cat_pid: 0,
  // 分类的等级 默认是一级分类
  cat_level: 0
})
// 添加分类的验证规则
const formRules = {
  cat_name: [
    { required: true, message: "请输入分类名称", trigger: "blur" },
    { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur" },
  ],
}
// 父级分类的数据列表
const ParentCateList = ref([])
// 指定级联选择器的配置对象
const cascaderProps = reactive({
  expandTrigger: 'hover',
  value: 'cat_id',//真实选中的是什么
  label: 'cat_name', //看到的是什么
  children: 'children' //父子嵌套的属性
})
// 级联选择器中选中的id值
const selectedKeys = ref([])
// 控制编辑分类对话框的显示与隐藏
const editDialogVisible = ref(false)
// 保存正在编辑状态下的数据
const editForm: any = ref({})

// 获取商品分类数据
const getCateList = async () => {
  const { data: res } = await request.get("categories", {
    params: queryInfo,
  });
  if (res.meta.status !== 200) {
    return ElMessage.error("获取商品分类数据失败：" + res.meta.msg);
  }
  // console.log(res);

  // 把数据列表赋值为cateList
  cateList.value = res.data.result;
  total.value = res.data.total;
}
// 监听 pagesize(一页多少条记录) 该变的事件
const handleSizeChange = (newSize: any) => {
  queryInfo.pagesize = newSize;
  getCateList();
}
// 监听 pagenum 页码的改变
const handleCurrentChange = (newPage: any) => {
  queryInfo.pagenum = newPage;
  getCateList();
}
// 点击添加分类按钮，显示对话框
const showAddCateDialog = () => {
  // 先获取父级分类的数据列表，再展示对话框
  getParentCateList()
  addCateDialogVisible.value = true;
}
// 获取父级分类的数据列表
const getParentCateList = async () => {
  const { data: res } = await request.get('categories ', { params: { type: 2 } })

  if (res.meta.status !== 200) {
    return ElMessage.error({
      message: res.meta.msg,
      duration: 1000
    })
  }
  ParentCateList.value = res.data
}
// 选择项发生变化，触发这个函数
const cateParentChange = () => {
  console.log(selectedKeys.value);
  if (selectedKeys.value.length > 0) {
    // 拿到选中项最子级的id
    AddCateForm.cat_pid = selectedKeys.value[selectedKeys.value.length - 1]
    // 为当前分类的等级赋值
    AddCateForm.cat_level = selectedKeys.value.length
  } else {
    AddCateForm.cat_pid = 0
    AddCateForm.cat_level = 0
  }
}
// 点击按钮添加新的分类
const addCate = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  console.log(AddCateForm);
  formEl.validate(async (valid: any, field: any) => {
    if (!valid) {
      let arr = Object.keys(field)
      return ElMessage.error({
        message: field[arr[0]][0].message,
        duration: 1500
      })
    }
    console.log('验证通过');

    console.log(AddCateForm);
    const { data: res } = await request.post('categories', AddCateForm)
    // 添加分类失败
    if (res.meta.status !== 201) {
      return ElMessage.error({
        message: res.meta.msg,
        duration: 1500
      });
    }

    ElMessage.success('添加分类成功')
    getCateList()
    addCateDialogVisible.value = false
  })
}
// 监听对话框的关闭事件，重置表单数据
const addCateDialogClose = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // 重置表单
  formEl.resetFields()
  // 重置选中的id数组
  selectedKeys.value = []
  // 重置分类的等级
  AddCateForm.cat_level = 0
  AddCateForm.cat_pid = 0
}
// 点击按钮显示编辑分类对话框
const showEditDiealog = async (cateInfo: any) => {
  console.log(cateInfo);
  const { data: res } = await request.get('categories/' + cateInfo.cat_id)
  console.log(res);
  // 根据id获取数据失败
  if (res.meta.status !== 200) {
    return ElMessage.error({
      message: res.meta.msg,
      duration: 1500
    })
  }
  // 把根据id查询到的数据赋值到 表单绑定的 editForm中
  editForm.value = res.data
  editDialogVisible.value = true
}
// 确认编辑分类信息
const editFormConfirm = async () => {
  const { data: res } = await request.put('categories/' + editForm.value.cat_id, {
    cat_name: editForm.value.cat_name
  })
  // 编辑失败
  if (res.meta.status !== 200) {
    return ElMessage.error({
      message: res.meta.msg,
      duration: 1500
    })
  }

  ElMessage.success({
    message: "编辑成功~",
    duration: 1500
  })

  // 刷新数据
  getCateList()
  editDialogVisible.value = false
}
// 编辑分类信息对话框关闭
const editFormDialogClose = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 点击了删除按钮
const removeCateByID = async (cateInfo: any) => {
  let result = await ElMessageBox.confirm(`此操作将永久删除 <span style="color:red;font-weight:bold;">${cateInfo.cat_name} </span>分类, 是否继续?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    dangerouslyUseHTMLString: true,
    type: 'warning'
  }).catch(reason => reason)

  // 取消 删除
  if (result === 'cancel') {
    return ElMessage.info({
      message: "已取消删除!",
      duration: 1500
    })
  }

  const { data: res } = await request.delete('categories/' + cateInfo.cat_id)
  // 删除 失败
  if (res.meta.status !== 200) {
    return ElMessage.error({
      message: res.meta.msg,
      duration: 1500
    })
  }

  ElMessage.success({
    message: '删除成功!',
    duration: 1000
  })
  getCateList()
}

getCateList()
</script>

<style lang="less" scoped>
.zk-table {
  margin-top: 15px;
}

.el-cascader {
  width: 100%;
}

.zk-table__cell-inner {
  font-size: 14px;
}
</style>
