<template>
  <div class="sortParameter">
    <!-- 卡片视图 -->
    <el-card>
      <el-alert title="注意: 只允许为第三级分类设置相关参数!" type="info" effect="dark" show-icon :closable="false">
      </el-alert>

      <!-- 选择商品分类 -->
      <el-row class="mt-5">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <!-- options 指定数据源 -->
          <!-- props 用来配置级联选择框 -->
          <el-cascader v-model="selectedCateKeys" :options="cateList" :props="cateProps"
            @change="handleChange"></el-cascader>
        </el-col>
      </el-row>

      <!-- Tabs页签区域 -->
      <!-- v-model 指定默认选中，和保存当前选中的是谁(跟踪el-tab-pane的name属性) -->
      <el-tabs v-model="activeName" @click="handleTabClick">
        <!-- 添加动态参数 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" :disabled="isBtnDisabled" @click="addDialogVisible = true"
            class="btn">添加参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTabData" border stripe>
            <!-- 展开行 -->
            <el-table-column type='expand'>
              <template #default="scope">
                <!-- 循环渲染tag标签 -->
                <el-tag class="el-tag-params" v-for="(item, index) in scope.row.attr_vals" :key="item.attr_id" closable
                  @close="handleClose(scope.row, index)">{{ item }}</el-tag>
                <!-- 创建输入tag标签 -->
                <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue"
                  ref="saveTagInput" @keyup.enter="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                </el-input>
                <el-button v-else class="button-new-tag" @click="showInput(scope.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type='index' label="#"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button round type="primary" :icon='Edit' @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button round type="danger" :icon="Delete" @click="removeParams(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加静态属性 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" :disabled="isBtnDisabled" @click="addDialogVisible = true"
            class="btn">添加属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="onlyTabData" border stripe>
            <!-- 展开行 -->
            <el-table-column type='expand'>
              <template #default="scope">
                <!-- 循环渲染tag标签 -->
                <el-tag class="el-tag-params" v-for="(item, index) in scope.row.attr_vals" :key="item.attr_id" closable
                  @close="handleClose(scope.row, index)">{{ item }}</el-tag>

                <!-- 创建输入tag标签 -->
                <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue"
                  ref="saveTagInput" @keyup.enter="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                </el-input>
                <!-- <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm" /> -->
                <el-button v-else class="button-new-tag" @click="showInput(scope.row)">+ New Tag</el-button>
                <!-- <el-button v-else class="button-new-tag" @click="showInput">+ New Tag</el-button> -->
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type='index' label="#"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button round type="primary" :icon="Edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                <el-button round type="danger" :icon="Delete" @click="removeParams(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数的对话框 -->
    <el-dialog :title="'添加' + titleText" v-model="addDialogVisible" width="40%" @close="addDialogClose(addFormRef)">
      <!-- 添加参数的对话框 -->
      <el-form :model="addForm" :rules="FormRules" ref="addFormRef" label-width="80px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams(addFormRef)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改参数的对话框 -->
    <el-dialog :title="'修改' + titleText" v-model="editDialogVisible" width="40%" @close="editDialogClose(editFormRef)">
      <!-- 添加参数的对话框 -->
      <el-form :model="editForm" :rules="FormRules" ref="editFormRef" label-width="80px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams(editFormRef)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, nextTick } from 'vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { Delete, Edit } from '@element-plus/icons-vue'
import request from "../../router/request"
import type { FormInstance } from 'element-plus'
import { ElInput } from 'element-plus'

const addFormRef = ref<FormInstance>()
const editFormRef = ref<FormInstance>()
const saveTagInput = ref()
// 商品分类列表
const cateList = ref([])
// 级联选择框配置对象
const cateProps = reactive({
  expandTrigger: 'hover',
  value: 'cat_id',//指定真实选中的值
  label: 'cat_name',//指定看见的值
  children: 'children'//父子节点的嵌套属性
})
// 级联选择框双向绑定到的数组
const selectedCateKeys: any = ref([])
// 被激活的页签的名称
const activeName: any = ref('many')
// 动态参数的数据
const manyTabData = ref([])
// 静态属性的数据
const onlyTabData = ref([])
// 控制添加参数对话框的显示与隐藏
const addDialogVisible = ref(false)
// 添加参数的表单数据对象
const addForm = reactive({
  attr_name: ''
})
// 添加参数和修改参数的表单验证规则对象
const FormRules = reactive({
  attr_name: [
    { required: true, message: `请输入参数名称`, trigger: 'blur' }
  ]
})
// 控制修改对话框的显示与隐藏
const editDialogVisible = ref(false)
// 修改对话框的表单数据对象
const editForm: any = ref({})
const isBtnDisabled = computed(() => {
  if (selectedCateKeys.value.length !== 3) return true
  return false
})
// 根据级联选择框是否选中三级分类返回 true | false,用于控制Button按钮是否禁用

// 当前选中的三级分类的id
const cateId = computed(() => {
  // console.log(selectedCateKeys.value[2]);
  if (selectedCateKeys.value.length === 3) return Number(selectedCateKeys.value[2])
  return null
})
// 动态计算对话框的标题文本
const titleText = computed(() => {
  if (activeName.value === 'many') return '动态参数'
  return '静态属性'
})
// 获取所有的商品分类列表
const getCateList = async () => {
  const { data: res } = await request.get("categories");
  console.log(res);
  if (res.meta.status !== 200) {
    return ElMessage.error({
      message: res.meta.msg,
      duration: 1500,
    });
  }
  cateList.value = res.data
}
// 级联选择框选中项变化会触发该函数
const handleChange = async () => {
  // 选中的不是三级分类
  if (selectedCateKeys.value.length !== 3) {
    ElMessage.warning('只能设置三级分类！')
    manyTabData.value = []
    onlyTabData.value = []
    selectedCateKeys.value = []
    return
  }
  getParamsData()
}
// tab 页签点击事件的处理函数
const handleTabClick = () => {
  // 没有选择分类
  if (selectedCateKeys.value.length === 0) {
    ElMessage.warning('请选择商品分类！')
    return selectedCateKeys.value = []
  }
  getParamsData()
}
// 获取参数的列表数据
const getParamsData = async () => {
  console.log("cateId:", cateId);
  // 根据所选分类的id和当前所处的面板获取对用的参数
  const { data: res } = await request.get(`categories/${cateId.value}/attributes`, { params: { sel: activeName.value } })
  console.log("res:", res);
  // console.log("cateId:", cateId);
  if (res.meta.status !== 200) {
    return ElMessage.error({
      message: res.meta.msg,
      duration: 1500,
    });
  }

  res.data.forEach((item: any) => {
    if (item.attr_vals) {
      item.attr_vals = item.attr_vals.split(',')
      // 新增一个属性，控制文本框(New Tag)的显示与隐藏
      // item.inputVisible = false
      // 文本框中输入的值
      item.inputValue = ''
    } else {
      // 新增一个属性，控制文本框(New Tag)的显示与隐藏
      // item.inputVisible = false
      // 文本框中输入的值
      item.inputValue = ''
      item.attr_vals = []
    }
  });
  if (activeName.value === 'many') {
    manyTabData.value = res.data
  } else {
    onlyTabData.value = res.data
  }
}
// 添加参数对话框的关闭事件
const addDialogClose = (formEl: FormInstance | undefined) => {
  // ref.addFormRef.resetFields()
  if (!formEl) return
  formEl.resetFields()
}
// 点击按钮 添加参数
const addParams = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: any, options: any) => {
    // 未通过表单验证
    if (!valid) {
      let arr = Object.keys(options)
      return ElMessage.error({
        message: options[arr[0]][0].message,
        duration: 1500
      })
    }

    const { data: res } = await request.post(`categories/${cateId.value}/attributes`, {
      attr_name: addForm.attr_name,
      attr_sel: activeName.value
    })

    // 添加参数失败
    if (res.meta.status !== 201) {
      return ElMessage.error({
        message: res.meta.msg,
        duration: 1500,
      });
    }
    ElMessage.success({
      message: "添加参数成功"
    })
    getParamsData()
    addDialogVisible.value = false
  })
}
// 点击按钮 展示修改参数对话框
const showEditDialog = async (attr_id: any) => {
  // 根据分类id和属性id查询当前需要编辑的数据
  const { data: res } = await request.get(`categories/${cateId.value}/attributes/${attr_id}`, {
    params: {
      attr_sel: activeName.value
    }
  })
  // 查询数据失败
  if (res.meta.status !== 200) {
    return ElMessage.error({
      message: res.meta.msg,
      duration: 1500,
    });
  }
  editForm.value = res.data
  editDialogVisible.value = true
}
// 关闭修改参数对话框，重置表单
const editDialogClose = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 点击按钮 确认修改参数信息
const editParams = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: any, options: any) => {
    // 未通过表单验证
    if (!valid) {
      let arr = Object.keys(options)
      return ElMessage.error({
        message: options[arr[0]][0].message,
        duration: 1500
      })
    }
    // 发起请求修改数据
    const { data: res } = await request.put(`categories/${cateId.value}/attributes/${editForm.value.attr_id}`, {
      attr_name: editForm.value.attr_name,
      attr_sel: activeName.value
    })

    // 修改参数失败
    if (res.meta.status !== 200) {
      return ElMessage.error({
        message: res.meta.msg,
        duration: 1500,
      });
    }

    ElMessage.success({
      message: "修改参数成功!",
      duration: 1500
    })
    getParamsData()
    editDialogVisible.value = false
  })
}
// 根据分类id和参数id 删除对应的参数
const removeParams = async (attrInfo: any) => {
  const result: any = await ElMessageBox.confirm(
    `此操作将永久删除 <strong style="color:red;">${attrInfo.attr_name}</strong> 参数, 是否继续?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    dangerouslyUseHTMLString: true,//开启html支持
    type: 'warning',
  }
  ).catch(reason => reason)

  // 取消删除
  if (result === 'cancel') {
    return ElMessage({
      message: "已取消删除!",
      duration: 1500
    })
  }

  const { data: res } = await request.delete(`categories/${cateId.value}/attributes/${attrInfo.attr_id}`)
  // 删除失败
  if (res.meta.status !== 200) {
    return ElMessage.error({
      message: res.meta.msg,
      duration: 1500,
    });
  }

  ElMessage.success({
    message: '删除成功',
    duration: 1500
  })
  getParamsData()
}
// 文本框失去焦点或按下回车都会触发该函数
const handleInputConfirm = async (rowInfo: any) => {
  // 未输入 或是 空字符串
  if (rowInfo.inputValue.trim().length === 0) {
    // rowInfo.inputValue = ''
    // rowInfo.inputVisible = false
    return
  }
  console.log(rowInfo.attr_vals);

  rowInfo.attr_vals.push(rowInfo.inputValue.trim())
  // rowInfo.inputValue = ''
  // rowInfo.inputVisible = false

  // 发起网络请求保存数据
  saveAttrVals(rowInfo)
}
// 点击按钮，显示文本输入框
const showInput = (rowInfo: any) => {
  rowInfo.inputVisible = true
  // 让文本框自动获得焦点
  // $nextTick 就是当页面上元素被重新渲染之后，才会执行回调函数中的代码
  nextTick(() => {
    console.log('1111')
    saveTagInput.value!.input!.focus()
  });
}
// 将对 attr_vals的操作保存到数据库
const saveAttrVals = async (rowInfo: any) => {
  const { data: res } = await request.put(`categories/${cateId.value}/attributes/${rowInfo.attr_id}`, {
    attr_name: rowInfo.attr_name,
    attr_sel: rowInfo.attr_sel,
    attr_vals: rowInfo.attr_vals.join(',')
  })

  if (res.meta.status !== 200) {
    return ElNotification.error({
      title: '失败',
      message: '更新数据失败！',
      type: 'error',
      duration: 1500
    });
  }

  ElNotification.success({
    title: '成功',
    message: '更新数据成功！',
    type: 'success',
    duration: 1500
  });
}
// 点击tag标签删除对应属性
const handleClose = async (rowInfo: any, index: any) => {
  const result: any = await ElMessageBox.confirm(`此操作将永久删除该 <strong style="color:red;">${rowInfo.attr_vals[index]}</strong> 属性, 是否继续?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    dangerouslyUseHTMLString: true,
    type: 'warning'
  }).catch(reason => reason)

  // 取消删除
  if (result === 'cancel') {
    return ElNotification.info({
      title: '取消',
      message: '已取消删除',
      duration: 1500
    })
  }

  rowInfo.attr_vals.splice(index, 1)
  // 将操作后的数据保存到数据库
  saveAttrVals(rowInfo)
}

getCateList()
</script>

<style lang='less' scoped >
.sortParameter {
  margin-top: 20px;

  .btn {
    margin-bottom: 20px;
  }
}

.mt-5 {
  margin: 15px 0;
}

.el-tag-params {
  margin-right: 15px;
}

.input-new-tag {
  width: 120px
}
</style>
