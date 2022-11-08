<template>
  <div class="boxlist">
    <el-tag>位置 <i class="el-icon-arrow-right"></i> 转运箱列表</el-tag>
    <!-- 查询，添加 -->
    <el-form :inline="true" class="add_data" ref="add_data" :model="search_data">
      <!-- 筛选 -->
      <el-form-item lable="按照时间筛选">
        <el-date-picker
          v-model="search_data.openTime"
          type="datetime"
          placeholder="选择开始时间">
        </el-date-picker>
          --
        <el-date-picker
          v-model="search_data.closeTime"
          type="datetime"
          placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          size="small" 
          icon="view" 
          @click="handleSearch()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
      </el-form-item>
      <el-form-item class="btnRight">
        <el-button 
          type="primary" 
          size="small" 
          icon="view" 
          @click="handleAdd()">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 信息列表 -->
    <div class="table_container">
      <el-table
        :data="tableData"
        border
        v-if="tableData.length > 0"
        max-height="500"
        :header-cell-style="{
          color: '#000'
        }">
        <!-- <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center">
        </el-table-column> -->
        <el-table-column
          prop="boxCode"
          label="转运箱编码"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="转运箱状态"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-tag size="small">
              {{scope.row.status == 0 ? '已开箱' : '已封箱'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="采集人员"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="openTime"
          label="开箱时间"
          width="220"
          align="center">
        </el-table-column>
        <el-table-column
          prop="closeTime"
          label="封箱时间"
          width="220"
          align="center">
        </el-table-column>

        <el-table-column 
          label="操作"
          align="center"
          prop="operation"
          >
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button 
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-row>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="paginations.pageIndex"
          :page-sizes="paginations.page_sizes"
          :page-size="paginations.pageSize"
          :layout="paginations.layout"
          :total="paginations.total">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import api from '../../axios/api'
export default {  
  name: 'boxlist',
  data() {
    return {
      search_data: {
        openTime: '',
        closeTime: ''
      },
      tableData: [],
      paginations: {
        pageIndex: 1,  // 当前位于那一页
        total: 0, // 总数
        pageSize: 5,  // 一页显示多少条
        page_sizes: [5,10,15,20],  // 每页显示多少条
        layout: 'total,sizes,prev,pager,next,jumper'  // 翻页属性
      },
      // dialog: {
      //   title: '',
      //   show: false,
      //   option: ''
      // },
      // formData: {
      //   pointId: '',
      //   pointName: ''
      // },
    }
  },
  methods: {
    // 获取转运箱列表
    getBoxList() {
      let pages = {
        pageIndex: this.paginations.pageIndex,
        pageSize: this.paginations.pageSize
      }
      api.post('/box/getPageBox.do',pages).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          this.tableData = res.data.data
          console.log(res)
          this.paginations.total = res.data.count
        }
      })
    },
    // 筛选
    handleSearch() {},
    // 添加
    handleAdd() {},
    // 编辑
    handleEdit(row) {},
    // 删除
    handleDelete(row) {},
    // 设置一页展示多少条数据
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize
      this.getBoxList()
    },
    // 设置显示第几页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page
      this.getBoxList()
    },
  },
  created() {
    this.getBoxList()
  }
}
</script>

<style>
.boxlist {
  padding: 16px;
}
.btnRight {
  float: right;
}
.add_data {
  margin-top: 5px;
}
.pagination {
  float: right;
}
</style>