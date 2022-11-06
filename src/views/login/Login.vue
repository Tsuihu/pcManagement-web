<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <el-form :model="loginUser" :rules="rules" ref="loginFrom" label-width="60px" class="loginFrom">
          <h1>核酸检测管理系统</h1>
          <el-form-item label="电话" prop="tel">
            <el-input type="tel" v-model="loginUser.tel" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm()">登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>还没有账号?现在 <router-link to='/registe'>注册</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import api from '../../axios/api'
export default {
  name: 'login',
  components:{},
  data() {
    return {
      loginUser:{
        tel:'',
        password:''
      },
      rules:{
        tel:[{
          required:true,
          message:'请输入正确手机号',
          trigger:'blur'
        },
        {
          min:11,
          max:11,
          message:'请输入正确手机号',
          trigger:'blur'
        }],
        password:[{
          required:true,
          message:'密码不能为空',
          trigger:'blur'
        },
        {
          min:6,
          max:30,
          message:'长度在6-30字符之间',
          trigger:'blur'
        }]
      }
    }
  },
  methods: {
    // 登录提交
    submitForm(){
        api.post('/manager/login.do',this.loginUser).then(res => {
          if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
            sessionStorage.setItem('manager',res.data)
            this.$router.push('/index')
          }
        })
      }
  }
}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(skyblue,#bac);
  background-size: 100% 100%;
}

.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.manage_tip .manage_tip {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  /* font-size: 26px; */
  color: #fff;
}
.loginFrom {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn{
  width: 100%;
}
.tiparea{
  text-align: right;
  color: #333;
  font-size: 12px;
}
.tiparea p a{
  color: #409eff;
}
</style>
