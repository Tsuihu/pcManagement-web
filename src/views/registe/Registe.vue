<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
          <h1 class="title">核酸检测管理系统</h1>
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="registerUser.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
            <el-input type="text" v-model="registerUser.tel" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="idcard">
            <el-input type="text" v-model="registerUser.idcard" placeholder="请输入身份证"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import api from '../../axios/api'
export default {
  name: 'register',
  components:{},
  data() {
    // 确认密码校验规则
    var validatePass2 = (rule, value, callback) => {
        if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      registerUser:{
        name:'',
        tel:'',
        idcard:'',
        password:'',
        password2:'',
      },
      rules:{
        name:[{
          required:true,  // 必填
          message:'用户名不能为空', // 提示信息
          trigger:'blur'  // 失去焦点触发
        },
        {
          min:2,  // 最小长度
          max:30, // 最大长度
          message:'长度在2-30字符之间',
          trigger:'blur'
        }],
        tel:[{
          required:true,
          message:'手机号格式不正确',
          trigger:'blur'
        },
        {
          min:11,  // 最小长度
          max:11, // 最大长度
          message:'手机号格式不正确',
          trigger:'blur'
        }],
        idcard:[{
          required:true,
          message:'身份证格式不正确',
          trigger:'blur'
        },
        {
          min:18,  // 最小长度
          max:18, // 最大长度
          message:'身份证格式不正确',
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
        }],
        password2:[{
          required:true,
          message:'确认密码不能为空',
          trigger:'blur'
        },
        {
          min:6,
          max:30,
          message:'长度在6-30字符之间',
          trigger:'blur'
        },
        {
          validator:validatePass2,
          trigger:'blur'
        }]
      }
    }
  },
  methods: {
    // 注册提交
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.post('/manager/registe.do',this.registerUser).then(res => {
            console.log(res)
            this.$router.push('/login')
          })
        }
      });
    }
  },
}
</script>

<style scoped>
.register {
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
.form_container .manage_tip {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  /* color: #fff; */
}
.title {
  font-size: 24px;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn{
  width: 100%;
}
</style>
