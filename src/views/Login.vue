<template>
  <div class="login">
    <div class="main">
      <img src="/img/login.png" class="login" alt="">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
        <el-form-item prop="age">
          <el-input v-model="ruleForm.age" :prefix-icon="UserFilled" />
        </el-form-item>
        <el-form-item prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" :prefix-icon="Lock
            " />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
// 此处设置组件名称
export default {
  name: 'MyLogin'
}
</script>

<script lang="ts" setup>
// @ts-ignore
import { useRouter } from 'vue-router'
// @ts-ignore
import { ref, reactive, getCurrentInstance } from 'vue'
import type { FormInstance, FormRules, } from 'element-plus'
import { ElMessage, ElLoading } from 'element-plus'
// @ts-ignore
import { UserFilled, Lock } from '@element-plus/icons-vue'
// Vue实例
const Vue: any = getCurrentInstance()
// Vue实例上的axios
const Axios = Vue.appContext.config.globalProperties.$axios
// 懒加载
const fullscreenLoading = ref(false)
// router
const Router = useRouter()
const ruleFormRef = ref<FormInstance>()
// 表单用户名验证
const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('用户名不能为空'))
  }
  setTimeout(() => {
    const age = /^[\u4e00-\u9fa5a-zA-Z0-9]{2,12}$/
    // console.log(age.test(value))
    if (!age.test(value)) {
      // console.log("eee")
      return callback(new Error('不能使用符号或空格,长度在2-12'))
    } else {
      callback()
    }
  }, 1000)
}
// 表单密码验证
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    if (ruleForm.checkPass !== '') {
      const age = /^[\u4e00-\u9fa5a-zA-Z0-9]{6,12}$/
      if (!age.test(ruleForm.checkPass)) {
        return callback(new Error('不能使用符号或空格,长度在6-12'))
      } else {
        callback()
      }
    }
    callback()
  }
}
// 表单
const ruleForm = reactive({
  pass: '',
  age: '',
})
// 表单效验规则
const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})
// 登录
const login = () => {
  Axios({
    mehtod: 'post', url: 'login', params: {
      username: ruleForm.age,
      password: ruleForm.pass,
      headers: {
        'X-Skip-Interceptor': true, // 在请求头中添加X-Skip-Interceptor头部来跳过拦截器
      },
    }
  }).then((res: any) => {
    console.log(res.data.meta.msg === '登录成功')
    if (res.data.meta.msg === '登录成功') {
      // 登录成功设置token值
      ElMessage({
        message: '登陆成功',
        type: 'success',
      })
      localStorage.setItem('token', res.data.data.token)
      Router.push('/index')
    } else {
      ElMessage.error('密码或用户名错误')
    }
  })
  // Axios({
  //   mehtod: 'get', url: 'goods', params: {
  //     pagenum: 1,
  //     pagesize: 10
  //   }
  // }).then((res)=>{
  //   console.log(res)
  // })
}
// 登录按钮
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: Boolean) => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {
        login()
        loading.close()
      }, 2000)
      // console.log('submit!')
    } else {
      // console.log('error submit!')
      return false
    }
  })
}
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6b;

  .main {
    position: fixed;
    top: calc(50% - 169px);
    left: calc(50% - 253px);
    // transform: rotate(-50%,-50%);
    width: 506px;
    height: 338px;
    background-color: #fff;
    border-radius: 6px;

    /deep/ .demo-ruleForm {
      width: 460px;
      margin: 0 auto;
      // text-align: right;
      margin-top: 126px;

      .el-form-item__content {
        justify-content: flex-end;
      }
    }

    .login {
      position: absolute;
      top: -73px;
      left: 178px;
      width: 146px;
      height: 146px;
      border: 8px solid #fff;
      border-radius: 50%;
    }
  }
}
</style>