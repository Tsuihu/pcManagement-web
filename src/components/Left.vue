<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        class="el-menu-vertical-demo"
        active-text-color="#409EFF"
        text-color="#303133">
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-th-large"></i>
            <span>首页</span>
          </el-menu-item>
        </router-link>
        <router-link to="/pointlist">
          <el-menu-item index="1">
            <i class="fa fa-hospital-o"></i>
            <span>检测站点</span>
          </el-menu-item>
        </router-link>
        <router-link to="/home">
          <el-menu-item index="2">
            <i class="fa fa-heartbeat"></i>
            <span>核算结果</span>
          </el-menu-item>
        </router-link>
        <router-link to="/tubelist">
          <el-menu-item index="3">
            <i class="fa fa-bar-chart"></i>
            <span>试管管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/boxlist">
          <el-menu-item index="4">
            <i class="fa fa-bar-chart"></i>
            <span>转运箱管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="/people">
          <el-menu-item index="5">
            <i class="fa fa-address-card"></i>
            <span>人员信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="/home">
          <el-menu-item index="6">
            <i class="fa fa-user-circle-o"></i>
            <span>系统用户</span>
          </el-menu-item>
        </router-link>

        <!-- <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
              <el-menu-item :index="citem.path">
                <span slot="title">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template> -->

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'left',
  data() {
    return {
      items:[
        {
          icon: 'fa-money',
          name: '核算结果',
          path: 'fund',
          children: [{path: 'fundlist',name: '资金流水'}]
        },
        {
          icon: 'fa-asterisk',
          name: '人员信息',
          path: 'info',
          children: [{path: '/info', name: '个人信息'}]
        }
      ]
    }
  },
}
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 72px;
  left: 0;
  min-height: 100%;
  z-index: 99;
  border-right: 1px solid rgb(233, 225, 225);
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-menu-item {
  font-size: 15px;
  min-width: 180px;
}
.el-menu-item i {
  margin-right: 10px;
  color: #000;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>