<template>
  <div id="UserList">
    <el-button style="float:left;margin-bottom: 20px" type="primary" @click="dialogFormVisible = true">添加角色
    </el-button>
    <el-table :data="dataSour"
              style="width: 100%;margin-top: 30px" :border="true">
      <el-table-column type="expand" label="" width="60">
        <template #default="scope">
          <el-row :class="[i1 === 0 ? 'bd-top' : '', 'bd-bottom', 'v-center']"
                  v-for="(item1,i1) in scope.row.children"
                  :key="item1.id">
            <!-- 渲染一级权限 -->
            <el-col :span="5" :class="['']" style="display: flex;align-items: center">
              <el-tag closable style="margin: 2% 2%">{{ item1.authName }}</el-tag>
              <el-icon>
                <CaretRight/>
              </el-icon>
            </el-col>
            <!--            渲染二级权限-->
            <el-col :span="19">
              <!--              通过v-for渲染嵌套来渲染二级权限-->
              <el-row :class="[i2 === 0 ? '' : 'bd-top','v-center']" v-for="(item2,i2) in item1.children"
                      :key="item2.id">
                <el-col :span="6" style="display: flex;align-items: center">
                  <el-tag type="success" closable>{{
                      item2.authName
                    }}
                  </el-tag>
                  <el-icon>
                    <CaretRight/>
                  </el-icon>
                </el-col>
                <!--              渲染三级-->
                <el-col :span="18">
                  <el-tag style="margin: 0 1%" closable type="warning" v-for="item3 in item2.children" :key="item3.id">
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" width="60">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.$index + 1 }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" width="450">
        <template #default="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色描述" width="450">
        <template #default="scope">
          <span>{{ scope.row.roleDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" :icon="EditPen" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" :icon="Delete" @click="handleDel(scope.row)">删除</el-button>
          <el-button type="warning" :icon="Setting" @click="distribution=true">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  添加对话框-->
    <el-dialog v-model="dialogFormVisible" title="添加用户">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="Description">
          <el-input v-model="form.Description" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
        <el-button type="primary" @click="AddCHARACTERS(ruleFormRef)">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
    <!--    编辑对话框-->
    <el-dialog v-model="dialogFormVisibleEdit" title="编辑角色">
      <el-form :model="formEdit" :rules="rulesEdit" ref="ruleFormRef">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="account">
          <el-input v-model="formEdit.account" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="Description">
          <el-input v-model="formEdit.Description" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
        <el-button type="primary" @click="EditCHARACTERS(ruleFormRef)">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
    <!--    分配权限-->
    <el-dialog v-model="distribution" title="分配角色权限">
      <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
      />
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="distribution=false">Cancel</el-button>
        <el-button type="primary" @click="distribution=false">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {Delete, EditPen, Setting, CaretRight} from "@element-plus/icons-vue";
import {reactive, ref} from 'vue'
import {ElMessage, ElMessageBox, FormInstance, FormRules} from "element-plus";
import {getCurrentInstance} from "vue";

interface User {
  id: number
  username: string
  email: string
  mobile: string
  role_name: string
  mg_state: boolean
}

const inter = getCurrentInstance()
const http = inter?.appContext.config.globalProperties.$axios
// 表格
let tableData: User[] = []
let dataSour = ref(tableData)
const dialogFormVisible = ref(false)
const dialogFormVisibleEdit = ref(false)
const distribution = ref(false)
const formLabelWidth = '140px'
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  roleId: 0,
  account: '',
  Description: '',
})
const formEdit = reactive({
  id: '',
  account: '',
  Description: '',
})
const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]

// 请求数据
const request = () => {
  http.get('roles').then((res: any) => {
    console.log(res.data)
    if (res.data.meta.status === 200) {
      tableData = res.data.data
      dataSour.value = tableData
    } else {
      ElMessage.error(res.data.meta.msg)
    }
  })
}
request()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dialogFormVisibleEdit.value = false
  dialogFormVisible.value = false
}
const AddCHARACTERS = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      http.post('roles', {
        roleName: form.account,
        roleDesc: form.Description
      }).then((res: any) => {
        if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
          ElMessage.success(res.data.meta.msg)
          request()
        }
      })
      dialogFormVisible.value = false
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const handleEdit = (row: User) => {
  console.log(row)
  dialogFormVisibleEdit.value = true
  formEdit.id = row.id
  formEdit.account = row.roleName
  formEdit.Description = row.roleDesc
}
const EditCHARACTERS = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      http.put(`roles/${formEdit.id}`, {
        id: formEdit.id,
        roleName: formEdit.account,
        roleDesc: formEdit.Description
      }).then((res: any) => {
        console.log(res.data)
        if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
          form.roleId = res.data.data.roleId
          ElMessage.success(res.data.meta.msg)
          request()
        } else {
          ElMessage.success(res.data.meta.msg)
        }
      })
      dialogFormVisibleEdit.value = false
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const handleDel = (row: User) => {
  ElMessageBox.confirm(
      '是否确认删除?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
      .then(() => {
        http.delete(`roles/${row.id}`, {
          id: row.id
        }).then((res: any) => {
          if (res.data.meta.status >= 200 && res.data.meta.status < 300) {
            ElMessage.success(res.data.meta.msg)
            request()
          } else {
            ElMessage.success(res.data.meta.msg)
          }
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除',
        })
      })
}
// 添加角色校验
const validateAccount = (rule: any, value: any, callback: any) => {
  let reg = /^[\w-]{4,16}$/
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (value.length >= 4 && value.length <= 16) {
    if (form.account !== '') {
      if (reg.test(form.account)) {
        callback()
      } else {
        callback(new Error('用户名错误'))
      }
    }
    callback()
  } else {
    callback(new Error('用户名长度要在4到16个字符'))
  }
}
const validateDescription = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof form>>({
  account: [{validator: validateAccount, trigger: 'change'}],
  Description: [{validator: validateDescription, trigger: 'blur'}],
})
const rulesEdit = reactive<FormRules<typeof form>>({
  account: [{validator: validateAccount, trigger: 'change'}],
  Description: [{validator: validateDescription, trigger: 'blur'}],
})
</script>

<style lang="less">
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.el-input-group {
  width: 30%;
}

.el-button {
  margin-left: 20px;
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.bd-top {
  border-top: 1px solid #eee;
}

.bd-bottom {
  border-bottom: 1px solid #eee;
}

.v-center {
  display: flex;
  align-items: center;
}

#UserList {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;

  .search {
    display: flex;
  }
}
</style>