<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <h1>管理员</h1>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <span>姓名：{{user.name}}</span>
          </div>
          <div class="user-item">
            <span>电话：{{user.tel}}</span>
          </div>
          <div class="user-item">
            <span>身份证：{{user.idcard}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'info',
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem('manager'))
    }
  }
}
</script>

<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.avatar {
  width: 150px;
  height: 150px;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user-item img {
  width: 25px;
}
.user-item span {
  margin-left: 10px;
  font-size: 19px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 20%;
  padding: 26px;
  font-size: 22px;
  color: #333;
}
</style>