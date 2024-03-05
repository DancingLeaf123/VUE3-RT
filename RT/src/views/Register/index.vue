<script setup>
// 表单效验，账号名+密码
import { ref } from 'vue'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()

// 准备表单对象
const form = ref({
  account: '',
  password: '',
  agree: true
})

const rules = {
  account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' }
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        console.log(value)
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
}

// 3. 获取form实例做统一校验
const formRef = ref(null)
const router = useRouter()
const doLogin = () => {
  const { account, password } = form.value
  // 调用实例方法
  formRef.value.validate(async (valid) => {
    // valid: 所有表单都通过校验  才为true
    console.log(valid)
    // 以valid做为判断条件 如果通过校验才执行登录逻辑
    if (valid) {
      // TODO LOGIN
      await userStore.getUserInfo({ account, password })
      // 1. 提示用户
      ElMessage({ type: 'success', message: '登录成功' })
      // 2. 跳转首页
      router.replace({ path: '/' })
    }
  })
}

// 1. 用户名和密码 只需要通过简单的配置（看文档的方式 - 复杂功能通过多个不同组件拆解）
// 2. 同意协议  自定义规则  validator:(rule,value,callback)=>{}
// 3. 统一校验  通过调用form实例的方法 validate -> true
</script>

<template>
  <div class="container">
    <header class="header">创建新用户或重置密码</header>
    <main class="main">
      <section class="login-section">
        <div class="wrapper">
          <nav>
            <a href="javascript:;">账户登录</a>
          </nav>
          <div class="account-box">
            <div class="form">
              <el-form
                ref="formRef"
                :model="form"
                :rules="rules"
                label-position="right"
                label-width="60px"
                status-icon
              >
                <el-form-item prop="account" label="用户名">
                  <el-input v-model="form.account" />
                </el-form-item>
                <el-form-item prop="password" label="初始密码">
                  <el-input v-model="form.password" />
                </el-form-item>
                <el-form-item prop="agree" label-width="22px">
                  <el-checkbox size="large" v-model="form.agree">
                    我已同意隐私条款和服务条款
                  </el-checkbox>
                </el-form-item>
                <el-button size="large" class="subBtn" @click="doLogin">创建用户</el-button>
              </el-form>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="footer">footer</footer>
  </div>
</template>

<style scoped lang="scss">
#app {
  width: 100%;
  padding: 0;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100vh; // 使容器占满整个视口高度
}

.header {
  background: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}

.main {
  flex: 1; // 使main区域占据剩余空间
  padding-top: 80px; // 需要足够的空间来避免被header遮挡
}

.login-section {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.account-box {
  // 适当的样式
}

.form {
  // 适当的样式
}

.footer {
  background: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}
</style>
