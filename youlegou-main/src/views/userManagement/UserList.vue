<template>
  <div id="UserList">
    <div class="search">
      <el-input
          v-model.trim="searchVal"
          placeholder="请输入用户名"
          class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search" @click="searchAccount"/>
        </template>
      </el-input>
      <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
    </div>
    <el-table :data="dataSour.slice((currentPage4 -1)*pageSize4,currentPage4*pageSize4)"
              style="width: 100%;margin-top: 30px" :border="true">
      <el-table-column label="#" width="60">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.$index + 1 }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="200">
        <template #default="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200">
        <template #default="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="200">
        <template #default="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="200">
        <template #default="scope">
          <span>{{ scope.row.role_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="200">
        <template #default="scope">
          <el-switch v-model="scope.row.mg_state" @change="UpdateStatus(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" :icon="EditPen" @click="handleEdit(scope.$index, scope.row)" round/>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" :icon="Delete" round/>
          <el-popover effect="light" trigger="hover" placement="top" width="auto" style="background-color: black">
            <template #default>
              <span style="font-size: 12px">分配角色</span>
            </template>
            <template #reference>
              <el-button type="warning" :icon="Setting" @click="Roles(scope.row)" round/>
            </template>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        style="margin-top: 20px"
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[1, 2, 3, 4]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataSour.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
    <!--  添加对话框-->
    <el-dialog v-model="dialogFormVisible" title="添加用户">
      <el-form :model="form" :rules="rules" ref="ruleFormRef">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pwd">
          <el-input
              v-model="form.pwd"
              type="password"
              placeholder=""
              show-password
          />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="mailbox">
          <el-input v-model="form.mailbox" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
        <el-button type="primary" @click="AddUser(ruleFormRef)">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
    <!--    编辑对话框-->
    <el-dialog v-model="dialogFormVisibleEdit" title="修改用户信息">
      <el-form :model="formEdit" :rules="rulesEdit" ref="ruleFormRef">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formEdit.account" autocomplete="off" disabled/>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="mailbox">
          <el-input
              v-model="formEdit.mailbox"
              placeholder=""
          />
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="formEdit.phone" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
        <el-button type="primary" @click="submitEdit(ruleFormRef)">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
    <!--    分配角色对话框-->
    <el-dialog v-model="dialogFormVisibleCHARACTERS" title="分配权限">
      <el-form :model="formCHARACTERS" ref="ruleFormRef">
        <el-form-item label="当前的用户:" :label-width="formLabelWidth">
          <span>{{ formCHARACTERS.account }}</span>
        </el-form-item>
        <el-form-item label="当前的角色:" :label-width="formLabelWidth">
          <span>{{ formCHARACTERS.role_name }}</span>
        </el-form-item>
        <el-form-item label="分配新角色:" :label-width="formLabelWidth">
          <el-select v-model="formCHARACTERS.New_Roles" clearable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
        <el-button type="primary" @click="submitRoles(ruleFormRef)">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  EditPen,
  Delete,
  Setting
} from '@element-plus/icons-vue'
import {ref, reactive, watch} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {Search} from '@element-plus/icons-vue'
// 搜索框
const searchVal = ref('')
import {getCurrentInstance} from "vue";
import {ElMessage} from "element-plus";

const inter = getCurrentInstance()
const http = inter?.appContext.config.globalProperties.$axios
// 表格
let tableData: User[] = []
let dataSour = ref(tableData)
// 分页器
const currentPage4 = ref(1)
const pageSize4 = ref(2)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
// 对话框
const dialogFormVisible = ref(false)
const dialogFormVisibleEdit = ref(false)
const dialogFormVisibleCHARACTERS = ref(false)
const formLabelWidth = '140px'
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  account: '',
  pwd: '',
  mailbox: '',
  phone: ''
})
// 校验表单
// @ts-ignore
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
// @ts-ignore
const validatePass = (rule: any, value: any, callback: any) => {
  let reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length >= 6 && value.length <= 18) {
    if (form.pwd !== '') {
      if (reg.test(form.pwd)) {
        callback()
      } else {
        callback(new Error('密码最少6位，包括1个大写和1个小写字母，1个特殊符号，1个数字'))
      }
    }
    callback()
  } else {
    callback(new Error('密码长度要6到18位'))
  }
}
// @ts-ignore
const validateMailbox = (rule: any, value: any, callback: any) => {
  let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else if (value !== '') {
    if (form.mailbox !== '') {
      if (reg.test(form.mailbox)) {
        callback()
      } else {
        callback(new Error('邮箱格式错误'))
      }
    }
    callback()
  } else {
    callback(new Error('例如：3303223115@qq.com 或 xx3303223115@126.com 格式'))
  }
}
// @ts-ignore
const validatePhone = (rule: any, value: any, callback: any) => {
  let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else if (value !== '') {
    if (form.phone !== '') {
      if (reg.test(form.phone)) {
        callback()
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    callback()
  } else {
    callback(new Error('例如：13511158580,11位手机号'))
  }
}
const rules = reactive<FormRules<typeof form>>({
  account: [{validator: validateAccount, trigger: 'change'}],
  pwd: [{validator: validatePass, trigger: 'change'}],
  mailbox: [{validator: validateMailbox, trigger: 'change'}],
  phone: [{validator: validatePhone, trigger: 'change'}],
})

let arr: User[] = []

function request() {
  http.get('users', {
    params: {
      pagenum: 1,
      pagesize: 100000
    }
  }).then((res: any) => {
    // console.log(res.data.data.users)
    tableData = res.data.data.users
    arr = tableData
    dataSour.value = tableData
  })
}

request()

interface User {
  id: number
  username: string
  email: string
  mobile: string
  role_name: string
  mg_state: boolean
}

// 编辑
const formEdit = reactive({
  id: 0,
  account: '',
  mailbox: '',
  phone: '',
  state: false
})
const rulesEdit = reactive<FormRules<typeof formEdit>>({
  mailbox: [{validator: validateMailbox, trigger: 'change'}],
  phone: [{validator: validatePhone, trigger: 'change'}],
})
// 分配角色
const formCHARACTERS = reactive({
  id: 0,
  rid: 0,
  account: '',
  role_name: '',
  New_Roles: '',
})
const options = [
  {
    value: 'test',
    label: 'test',
  },
  {
    value: '超级管理员',
    label: '超级管理员',
  }
]

const AddUser = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      http.post('users', {
        username: form.account,
        password: form.pwd,
        email: form.mailbox,
        mobile: form.phone
      }).then((res: any) => {
        console.log(res)
        ElMessage.success(res.data.meta.msg)
        request()
      })
      dialogFormVisible.value = false
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dialogFormVisibleCHARACTERS.value = false
  dialogFormVisibleEdit.value = false
  dialogFormVisible.value = false
}
// 表格
const UpdateStatus = (row: User) => {
  http.put(`users/${row.id}/state/${row.mg_state}`).then((res: any) => {
    formCHARACTERS.rid = res.data.data.rid
    ElMessage.success(res.data.meta.msg)
  })
}
// @ts-ignore
const handleEdit = (index: number, row: User) => {
  dialogFormVisibleEdit.value = true
  // console.log(index, row)
  formEdit.account = row.username
  formEdit.mailbox = row.email
  formEdit.phone = row.mobile
  formEdit.id = row.id
  formEdit.state = row.mg_state
}
const submitEdit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      http.put(`users/${formEdit.id}`, {
        id: formEdit.id,
        email: formEdit.mailbox,
        mobile: formEdit.phone
      }).then((res: any) => {
        console.log(res)
        formCHARACTERS.rid = res.data.data.role_id
        console.log(formCHARACTERS.rid)
        ElMessage.success(res.data.meta.msg)
        request()
      })
      dialogFormVisibleEdit.value = false
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
// @ts-ignore
const handleDelete = (index: number, row: User) => {
  // console.log(index, row)
  http.delete(`users/${row.id}`, {
    id: row.id
  }).then((res: any) => {
    ElMessage.success(res.data.meta.msg)
    request()
  })
}
const Roles = (row: User) => {
  console.log(row)
  formCHARACTERS.id = row.id
  formCHARACTERS.account = row.username
  formCHARACTERS.role_name = row.role_name
  dialogFormVisibleCHARACTERS.value = true
}
const submitRoles = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      http.put(`users/${formCHARACTERS.id}/role`, {
        id: formCHARACTERS.id,
        rid: formCHARACTERS.rid
      }).then((res: any) => {
        console.log(res)
        if (res.data.meta.status === 200) {
          formCHARACTERS.rid = res.data.data.rid
          formCHARACTERS.role_name = formCHARACTERS.New_Roles
          ElMessage.success(res.data.meta.msg)
          request()
        } else {
          ElMessage.error(res.data.meta.msg)
        }
      })
      dialogFormVisibleCHARACTERS.value = false
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const searchAccount = () => {
  if (searchVal.value === '') return dataSour.value = arr
  tableData.forEach((item: any) => {
    if (item.username === searchVal.value) {
      http.get(`users/${item.id}`, {
        params: {
          id: item.id
        }
      }).then((res: any) => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          ElMessage.success(res.data.meta.msg)
          tableData = [res.data.data]
          dataSour.value = tableData
        } else {
          ElMessage.error(res.data.meta.msg)
        }
      })
    }
  })
}
// 分页器
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pageSize4.value = val
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  currentPage4.value = val
}
// 校验密码
watch(() => form.pwd, (newVal, oldVal) => {
  console.log(newVal, oldVal)
  form.pwd = form.pwd.replace(/[\u4e00-\u9fa5/\s+/]/g, "")
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

#UserList {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;

  .search {
    display: flex;
  }
}
</style>