<template>
  <header class="header-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png" class="logo" alt="">
        <span class="title">核酸检测管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <!-- <img src="../assets/user.png" class="avatar" alt=""> -->
        </div>
        <div class="welcome">
          <p class="name comename">欢迎</p>
          <p class="name avatarname"></p>
        </div>
        <span class="username">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'info',
  computed: {
    // user(){
    //   return this.$store.getters.user
    // }
  },
  methods: {
    
  },
}
</script>

<style scoped>
.header-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #fff;
  color: #000;
  border-bottom: 2px solid #ddd;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 35px;
  width: 35px;
  margin-left: 60px;
  margin-right: 20px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 24px;
  font-weight: bold;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.userinfo {
  display: inline-block;
  vertical-align: middle;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.comename {
  font-size: 12px;
  font-weight: bold;
}
.avatarname {
  color: #409eff;
}
.username {
  display: inline-block;
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>