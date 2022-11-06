<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">资金后台管理系统</span>
        <el-form :model="loginUser" :rules="rules" ref="loginFrom" label-width="60px" class="loginFrom">
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="loginUser.email" placeholder="请输入email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginFrom')">登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>还没有账号?现在 <router-link to='/register'>注册</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'login',
  components:{},
  data() {
    return {
      loginUser:{
        email:'',
        password:''
      },
      rules:{
        email:[{
          type:'email',
          required:true,
          message:'邮箱格式不正确',
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
    submitForm(loginFrom){
      
    },
   
  }
}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: skyblue;
  /* background: url(../assets/bg.jpg) no-repeat center center; */
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
.form_container .manage_tip {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
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
