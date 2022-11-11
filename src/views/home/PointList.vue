<template>
  <div class="pointlist">
    <el-tag>位置 <i class="el-icon-arrow-right"></i> 检测站点</el-tag>
    <!-- 添加 -->
    <el-button 
      class="btnRight"
      type="primary" 
      size="small" 
      icon="view" 
      @click="handleAdd()">添加</el-button>
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
        <el-table-column
          type="index"
          label="序号"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="pointName"
          label="检测站点"
          width="700"
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
    <PointAdd 
      :dialog="dialog" 
      :formData="formData"
      @update="getAllPoint" />

  </div>
</template>

<script>
import api from '../../axios/api'
import PointAdd from '../../components/PointAdd.vue'
export default {  
  name: 'pointlist',
  components: {
    PointAdd
  },
  data() {
    return {
      tableData: [],
      allTableData: [],
      paginations: {
        pageIndex: 1,  // 当前位于那一页
        total: 0, // 总数
        pageSize: 5,  // 一页显示多少条
        page_sizes: [5,10,15,20],  // 每页显示多少条
        layout: 'total,sizes,prev,pager,next,jumper'  // 翻页属性
      },
      dialog: {
        title: '',
        show: false,
        option: ''
      },
      formData: {
        pointId: '',
        pointName: ''
      },
    }
  },
  methods: {
    // 获取地点数据
    getAllPoint() {
      let pages = {
        pageIndex: this.paginations.pageIndex,
        pageSize: this.paginations.pageSize
      }
      api.post('/point/getPage.do',pages).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          this.tableData = res.data.data
          this.paginations.total = res.data.count
        }
      })
    },
    // 添加
    handleAdd() {
      this.dialog = {
        title: '添加检测站点名称',
        show: true,
        option: 'addPoint.do'
      }
      this.formData = {}
    },
    // 编辑
    handleEdit(index,row) {
      this.dialog = {
        title: '修改检测站点名称',
        show: true,
        option: 'updatePoint.do'
      },
      this.formData = row
    },
    // 删除
    handleDelete(index,row) {
      if(confirm('确认删除？')) {
        api.post(`/point/deletePoint.do?pointId=${row.pointId}`).then(res => {
          if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
            this.getAllPoint()
          }
        })
      }
    },
    // 设置一页展示多少条数据
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize
      this.getAllPoint()
      // 当前页数
      // this.paginations.pageIndex = 1
      // this.paginations.pageSize = pageSize
      // this.tableData = this.allTableData.filter((item,index) => {
      //   return index < pageSize
      // })
    },
    // 设置显示第几页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page
      this.getAllPoint()
      // // 获取当前页
      // let index = this.paginations.pageSize * (page - 1)
      // // 数据总数
      // let nums = this.paginations.pageSize * page
      // // 容器
      // let tables = []
      // for(let i = index; i < nums; i++) {
      //   if(this.allTableData[i]) {
      //     tables.push(this.allTableData[i])
      //   }
      //   this.tableData = tables
      // }
    },
    // 设置分页默认属性
    setPaginations(){
      // 分页属性设置
      // this.paginations.total = this.allTableData.length
      // this.paginations.pageIndex = 1
      // this.paginations.pageSize = 5 
      // 设置默认的分页数据
      // this.tableData = this.allTableData.filter((item,index) => {
      //   return index < this.paginations.pageSize
      // })
    },
  },
  created() {
    this.setPaginations()
    this.getAllPoint()
  }
}
</script>

<style>
.pointlist {
  padding: 16px;
}
.table_container {
  margin-top: 5px;
}
.pagination {
  float: right;
  margin-top: 5px;
}
.add_data {
  margin-top: 5px;
}
.btnRight {
  float: right;
}
</style>