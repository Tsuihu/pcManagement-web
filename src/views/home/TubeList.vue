<template>
  <div class="tubelist">
    <el-tag>位置 <i class="el-icon-arrow-right"></i> 试管列表</el-tag>
    <!-- 查询，添加 -->
    <el-form :inline="true" class="add_data">
      <!-- 查询 -->
      <div class="searchLeft">
        <el-input
          placeholder="请输入试管编码"
          prefix-icon="el-icon-search"
          v-model="searchTubeCode"
          @keyup.enter="btnSearch()">
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
          prop="testtubeCode"
          label="试管编码"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="试管状态"
          width="100"
          align="center">
            <template slot-scope="scope">
              <!-- <el-tag size="small">
                {{scope.row.status == 0 ? '已开管' : '已封管'}}
              </el-tag> -->
              {{scope.row.status == 0 ? '已开管√' : '已封管×'}}
            </template>
        </el-table-column>
        <el-table-column
          prop="collectType"
          label="采集类型"
          width="100"
          align="center"
          :formatter="formatterStatus">
        </el-table-column>
        <el-table-column
          prop="testResult"
          label="采集结果"
          width="100"
          align="center">
            <template slot-scope="scope">
              <!-- {{scope.row.testResult == 0 ? '阴性' : '阳性'}} -->
              <el-tag v-if="scope.row.testResult == 0" size="small">
                阴性
              </el-tag>
              <el-tag v-if="scope.row.testResult != 0" type="warning"  size="small">
                阳性
              </el-tag>
            </template>
        </el-table-column>
        <el-table-column
          prop="openTime"
          label="开管时间"
          width="220"
          align="center">
        </el-table-column>
        <el-table-column
          prop="closeTime"
          label="封管时间"
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
          <el-form-item prop="testtubeCode" label="试管编码">
            <el-input type="text" v-model="addFormData.testtubeCode"></el-input>
          </el-form-item>
          <el-form-item prop="collectType" label="试管类型">
            <el-select v-model="addFormData.collectType" placeholder="试管类型">
              <el-option label="1" value="1">单采</el-option>
              <el-option label="10" value="10">10人混采</el-option>
              <el-option label="20" value="20">20人混采</el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="boxCode" label="所属转运箱编码">
            <!-- <el-input type="text" v-model="addFormData.boxCode"></el-input> -->
            <el-select v-model="addFormData.boxCode"  placeholder="所属转运箱编码">
              <el-option
                v-for="(item,index) in boxList"
                :key="index" 
                :label="item.boxCode" 
                :value="item.boxCode">
                  {{item.boxCode}}
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
          <el-form-item prop="testtubeCode" label="试管编码">
            <el-input type="text" v-model="EditFormData.testtubeCode"></el-input>
          </el-form-item>
          <el-form-item prop="collectType" label="试管类型">
            <el-select v-model="EditFormData.collectType" placeholder="试管类型">
              <el-option label="单采" :value="1"></el-option>
              <el-option label="10人混采" :value="10"></el-option>
              <el-option label="20人混采" :value="20"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="boxCode" label="所属转运箱编码">
            <el-input type="text" v-model="EditFormData.boxCode"></el-input>
          </el-form-item>
          <el-form-item prop="status" label="试管状态">
            <el-select v-model="EditFormData.status" placeholder="试管状态">
              <el-option label="开管" :value="0"></el-option>
              <el-option label="封管" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="testResult" label="结果">
            <el-select v-model="EditFormData.testResult" placeholder="采集结果">
              <el-option label="阴性" value="0"></el-option>
              <el-option label="阳性" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  class="text_right">
            <el-button @click="editDialog.show = false">取 消</el-button>
            <el-button type="primary" @click='editOnSubmit()'>提  交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../axios/api'
export default {  
  name: 'tubelist',
  data() {
    return {
      searchTubeCode: '',
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
        testtubeCode: '',
        collectType: '',
        boxCode: ''
      },
      editDialog: {
        title: '编辑试管',
        show: false,
        option: ''
      },
      EditFormData: {
        testtubeCode: '',
        collectType: '',
        boxCode: '',
        status: '',
        testResult: '',
        testtubeId: ''
      },
      boxList: []
    }
  },
  methods: {
    // 获取转运箱列表
    getTubeList() {
      let pages = {
        pageIndex: this.paginations.pageIndex,
        pageSize: this.paginations.pageSize
      }
      api.post('/testtube/getPage.do',pages).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          this.allTableData = res.data.data
          this.paginations.total = res.data.count
          this.setPaginations()
        }
      })
    },
    // 搜索
    btnSearch() {
      console.log(this.searchTubeCode)
      if(this.searchTubeCode) {
        api.post(`/testtube/getLikeCode.do?testtubeCode=${this.searchTubeCode}`).then(res => {
          if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
            // console.log(res)
            this.tableData = res.data
          }
        })
        this.searchTubeCode = ''
      }else {
        this.$message('请输入箱子编码 ')
      }
      
    },
    // 添加
    handleAdd() {
      this.dialog.show = true
      api.post('/box/getAllBoxCode.do').then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          // console.log(res.data)
          this.boxList = res.data
        }
      })
    },
    // 添加dialog
    addOnSubmit() {
      api.post('/testtube/addTestTube.do',this.addFormData).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          // console.log(res)
          this.dialog.show = false
          this.addFormData = {}
          this.getTubeList()
        }
      })
    },
    // 编辑
    handleEdit(index,row) {
      this.EditFormData = row
      this.editDialog.show = true
    },
    // 编辑dialog
    editOnSubmit() {
      console.log(this.EditFormData)
      api.post('/testtube/updateTestTube.do',this.EditFormData).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          // console.log(res)
          this.editDialog.show = false
          this.getTubeList()
        }
      })
    },
    // 删除
    handleDelete(index,row) {
      // console.log(row.testtubeId)
      if(confirm('确认删除？')) {
        api.post(`/testtube/deleteTube.do?testtubeId=${row.testtubeId}`).then(res => {
          if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
            // console.log(res)
            this.getTubeList()
          }
        }) 
      }
    },
    // 设置一页展示多少条数据
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize
      this.getTubeList()
    },
    // 设置显示第几页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page
      this.getTubeList()
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
    // 格式化试管类型
    formatterStatus(row) {
        switch(row.collectType) {
          case 1:
            return "单采"
          case 10:
            return "10人混采"
          case 20:
            return "20人混采"
        }
        return ""
    }
  },
  created() {
    this.getTubeList()
  }
}
</script>

<style>
.tubelist {
  padding: 16px;
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
.btnRight {
  float: right;
}
.add_data {
  margin-top: 10px;
}
.pagination {
  float: right;
}
</style>