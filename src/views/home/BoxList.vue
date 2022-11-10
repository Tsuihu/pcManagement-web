<template>
  <div class="boxlist">
    <el-tag>位置 <i class="el-icon-arrow-right"></i> 转运箱列表</el-tag>
    <!-- 查询，添加 -->
    <el-form :inline="true" class="add_data">
      <!-- 查询 -->
      <div class="searchLeft">
        <el-input
          placeholder="请输入试管编码"
          prefix-icon="el-icon-search"
          v-model="searchBoxCode"
          @keydown.enter="btnSearch()">
        </el-input>
        <el-button 
            type="primary" 
            size="small" 
            icon="view" 
            @click="btnSearch()">搜索</el-button>
      </div>
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

    <!-- 添加 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false">
      <div class="form">
        <el-form
          :model="addFormData"
          label-width="120px"
          style="margin:10px;width=auto">
          <el-form-item prop="boxCode" label="转运箱编码">
            <el-input type="text" v-model="addFormData.boxCode"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="采集人员名字">
            <!-- <el-input type="text" v-model="addFormData.name"></el-input> -->
            <el-select v-model="addFormData.name"  placeholder="采集人员名字">
              <el-option
                v-for="(item,index) in collectors"
                :key="index" 
                :label="item.name" 
                :value="item.name">
                  {{item.name}}
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="pointName" label="采集地点">
            <!-- <el-input type="text" v-model="addFormData.pointName"></el-input> -->
            <el-select v-model="pointList.pointName"  placeholder="采集地点">
              <el-option
                v-for="(item,index) in pointList"
                :key="index" 
                :label="item.pointName" 
                :value="item.pointName">
                  {{item.pointName}}
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click='addOnSubmit()'>提  交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog
      :title="editDialog.title"
      :visible.sync="editDialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false">
      <div class="form">
        <el-form
          :model="EditFormData"
          label-width="120px"
          style="margin:10px;width=auto">
          <el-form-item prop="boxCode" label="转运箱编码">
            <el-input type="text" v-model="EditFormData.boxCode"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="采集人员名字">
            <el-input type="text" v-model="EditFormData.name"></el-input>
            <!-- <el-select v-model="addFormData.name" placeholder="试管类型">
              <el-option label="1" value="1">单采</el-option>
              <el-option label="10" value="10">10人混采</el-option>
              <el-option label="20" value="20">20人混采</el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item prop="status" label="转运箱状态">
            <el-select v-model="EditFormData.status" placeholder="试管状态">
              <el-option label="开箱" value="0">开箱</el-option>
              <el-option label="封箱" value="1">封箱</el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="pointName" label="采集地点">
            <el-input type="text" v-model="EditFormData.pointName"></el-input>
          </el-form-item>
          <el-form-item  class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="text" @click='editOnSubmit()'>提  交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import api from '../../axios/api'
export default {  
  name: 'boxlist',
  data() {
    return {
      searchBoxCode: '',
      tableData: [],
      // 容器
      allTableData: [],
      paginations: {
        pageIndex: 1,  // 当前位于那一页
        total: 0, // 总数
        pageSize: 5,  // 一页显示多少条
        page_sizes: [5,10,15,20],  // 每页显示多少条
        layout: 'total,sizes,prev,pager,next,jumper'  // 翻页属性
      },
      dialog: {
        title: '添加试管',
        show: false,
        option: ''
      },
      addFormData: {
        boxCode: '',
        name: '',
        pointName: ''
      },
      editDialog: {
        title: '编辑试管',
        show: false,
        option: ''
      },
      EditFormData: {
        boxCode: '',
        status: '',
        name: '',
        pointName: ''
      },
      pointList: [],
      collectors: []
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
          // this.tableData = res.data.data
          // this.paginations.total = res.data.count
          // console.log(res)
          this.allTableData = res.data.data
          this.paginations.total = res.data.count
          this.setPaginations()
        }
      })
    },
    // 搜索
    btnSearch() {
      console.log(this.searchBoxCode)
      if(this.searchBoxCode) {
        api.post(`/box/getLikeCode.do?boxCode=${this.searchBoxCode}`).then(res => {
          if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
            this.tableData = res.data
            console.log(res)
          }
        })
        this.searchBoxCode = ''
      }else {
        this.$message('请输入箱子编码 ')
      }
    },
    // 添加
    handleAdd() {
      this.dialog.show = true
      api.post('/point/getAllPointName.do').then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          console.log(res.data)
          this.pointList = res.data
        }
      })
      api.post('/collector/getAllName.do').then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          console.log(res.data)
          this.collectors = res.data
        }
      })
    },
    addOnSubmit() {
      api.post('/box/addBox.do',this.addFormData).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          console.log(res)
          this.dialog.show = false
          this.addFormData = {}
          // this.getBoxList()
        }
      })
    },
    // 编辑
    handleEdit(index,row) {
      console.log(row)
      this.EditFormData = row
      this.editDialog.show = true
    },
    editOnSubmit() {
      api.post('/box/updateBox.do',this.EditFormData).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          console.log(res)
          this.editDialog.show = false
        }
      })
    },
    // 删除
    handleDelete(index,row) {
      if(confirm('确认删除？')) {
        api.post(`/box/deleteBox.do?boxId=${row.boxId}`).then(res => {
          if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
            console.log(res)
            this.getBoxList()
          }
        }) 
      }
    },
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
    setPaginations(){
      // 分页属性设置
      // this.paginations.total = this.allTableData.count
      this.paginations.page_index = 1
      this.paginations.page_size = 5 
      // 设置默认的分页数据
      this.tableData = this.allTableData.filter((item,index) => {
        return index < this.paginations.page_size
      })
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
.searchLeft .el-input {
  width: 300px;
  float: left;
}
.searchLeft .el-button {
  float: left;
  margin-left: 10px;
  margin-top: 3px;
}
.add_data {
  margin-top: 5px;
  overflow: hidden;
}
.pagination {
  float: right;
}
</style>