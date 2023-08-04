<template>
  <div id="UserList">
    <div class="search">
      <el-input
          v-model="searchVal"
          placeholder="Please input"
          class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search"/>
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
          <el-switch v-model="scope.row.mg_state"/>
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
              <el-button type="warning" :icon="Setting" round/>
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
    <el-dialog v-model="dialogFormVisible" title="添加">
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
const formLabelWidth = '140px'
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  account: '',
  pwd: '',
  mailbox: '',
  phone: ''
})
// 校验表单
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

function request() {
  http.get('users', {
    params: {
      pagenum: 1,
      pagesize: 100000
    }
  }).then((res: any) => {
    // console.log(res.data.data.users)
    tableData = res.data.data.users
    dataSour.value = tableData
  })
}

request()

interface User {
  username: string
  email: string
  mobile: string
  role_name: string
  mg_state: boolean
}

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
  dialogFormVisible.value = false
}
// 表格
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
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