<template>
  <div class="collectors">
    <el-tag>位置 <i class="el-icon-arrow-right"></i> 采集人员列表</el-tag>
    <!-- 查询，添加 -->
    <el-form :inline="true" class="add_data" ref="add_data" :model="search_data">
      <el-form-item class="btnRight">
        <el-button 
          type="primary" 
          size="small" 
          icon="view" 
          @click="handleAdd()">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 采集人列表 -->
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
          prop="name"
          label="采集人姓名"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="idcard"
          label="身份证"
          width="250"
          align="center">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="registTime"
          label="注册时间"
          width="250"
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
          :rules="rules"
          :model="addFormData"
          label-width="120px"
          style="margin:10px;width=auto">
          <el-form-item prop="name" label="采集人姓名">
            <el-input type="text" v-model="addFormData.name"></el-input>
          </el-form-item>
          <el-form-item prop="idcard" label="身份证">
            <el-input type="text" v-model="addFormData.idcard"></el-input>
          </el-form-item>
          <el-form-item prop="tel" label="电话">
            <el-input type="text" v-model="addFormData.tel"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="addFormData.password"></el-input>
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
          :rules="rules"
          :model="EditFormData"
          label-width="120px"
          style="margin:10px;width=auto">
          <el-form-item prop="name" label="采集人姓名">
            <el-input type="text" v-model="EditFormData.name"></el-input>
          </el-form-item>
          <el-form-item prop="idcard" label="身份证">
            <el-input type="text" v-model="EditFormData.idcard"></el-input>
          </el-form-item>
          <el-form-item prop="tel" label="电话">
            <el-input type="text" v-model="EditFormData.tel"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="EditFormData.password"></el-input>
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
  name: 'collectors',
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
      dialog: {
        title: '添加采集人信息',
        show: false,
        option: ''
      },
      addFormData: {
        name: '',
        idcard: '',
        tel: '',
        password: ''
      },
      editDialog: {
        title: '编辑采集人信息',
        show: false,
        option: ''
      },
      EditFormData: {
        name: '',
        idcard: '',
        tel: '',
        password: ''
      },
      rules:{
        tel:[{
          required:true,
          message:'手机号不能为空',
          trigger:'blur'
        },
        {
          min:11,
          max:11,
          message:'请输入11位手机号',
          trigger:'blur'
        }],
        password:[{
          required:true,
          message:'密码不能为空',
          trigger:'blur'
        },
        {
          min:6,
          message:'长度最小6位',
          trigger:'blur'
        }],
        idcard:[{
          required:true,
          message:'身份证不能为空',
          trigger:'blur'
        },
        {
          min:18,
          max:18,
          message:'请输入18位身份证',
          trigger:'blur'
        }]
      }
    }
  },
  methods: {
    // 获取采集人员信息
    getCollectors() {
      let pages = {
        pageIndex: this.paginations.pageIndex,
        pageSize: this.paginations.pageSize
      }
      api.post('/collector/getPageCollector.do',pages).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          this.tableData = res.data.data
          // console.log(res)
          this.paginations.total = res.data.count
        }
      })
    },
    // 筛选
    handleSearch() {},
    // 添加
    handleAdd() {
      this.dialog.show = true
    },
    // 添加dialog
    addOnSubmit() {
      api.post('/collector/addCollector.do',this.addFormData).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          // console.log(res)
          this.dialog.show = false
          this.addFormData = {}
          this.getCollectors()
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
      // console.log(this.EditFormData)
      api.post('/collector/updateCollector.do',this.EditFormData).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          // console.log(res)
          this.editDialog.show = false
          this.getCollectors()
        }
      })
    },
    // 删除
    handleDelete(index,row) {
      if(confirm('确认删除？')) {
        api.post(`/collector/deleteCollector.do?collectorId=${row.collectorId}`).then(res => {
          if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
            // console.log(res)
            this.getCollectors()
          }
        }) 
      }
    },
    // 设置一页展示多少条数据
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize
      this.getCollectors()
    },
    // 设置显示第几页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page
      this.getCollectors()
    },
  },
  created() {
    this.getCollectors()
  }
}
</script>

<style>
.collectors {
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