<template>
  <div class="people">
    <el-tag>位置 <i class="el-icon-arrow-right"></i> 人员信息</el-tag>
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
        <el-table-column
          prop="peopleId"
          label="序号"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="idcard"
          label="身份证"
          width="250"
          align="center">
        </el-table-column>
        <el-table-column
          prop="result"
          label="核酸结果"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button @click="handleResult(scope.$index, scope.row)" size="small" type="info">查看</el-button>
          </template>
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
          <el-form-item prop="name" label="姓名">
            <el-input type="text" v-model="addFormData.name"></el-input>
          </el-form-item>
          <el-form-item prop="idcardType" label="身份证类型">
            <el-select v-model="addFormData.idcardType" placeholder="身份证类型">
              <el-option label="身份证" value="0">身份证</el-option>
              <el-option label="护照" value="1">护照</el-option>
              <el-option label="xxx" value="2">xxx</el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="idcard" label="身份证">
            <el-input type="text" v-model="addFormData.idcard"></el-input>
          </el-form-item>
          <el-form-item prop="tel" label="电话">
            <el-input type="text" v-model="addFormData.tel"></el-input>
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
          <el-form-item prop="name" label="姓名">
            <el-input type="text" v-model="EditFormData.name"></el-input>
          </el-form-item>
          <el-form-item prop="idcardType" label="身份证类型">
            <el-select v-model="EditFormData.idcardType" placeholder="身份证类型">
              <el-option label="身份证" value="0">身份证</el-option>
              <el-option label="护照" value="1">护照</el-option>
              <el-option label="xxx" value="2">xxx</el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="idcard" label="身份证">
            <el-input type="text" v-model="EditFormData.idcard"></el-input>
          </el-form-item>
          <el-form-item prop="tel" label="电话">
            <el-input type="text" v-model="EditFormData.tel"></el-input>
          </el-form-item>
          <el-form-item  class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="text" @click='editOnSubmit()'>提  交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 结果 -->
    <el-dialog
      :title="resultDialog.title"
      :visible.sync="resultDialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false">
      <div class="form">
        <el-form
          :model="resultFormData"
          label-width="120px"
          style="margin:10px;width=auto">
          <el-form-item prop="testtubeCode" label="所对应试管编码">
            {{resultFormData.testtubeCode}}
          </el-form-item>
          <el-form-item prop="testResult" label="核算结果">
            <el-tag v-if="resultFormData.testResult == 0" size="small">阴性</el-tag>
              <el-tag v-if="resultFormData.testResult != 0" type="warning"  size="small">阳性</el-tag>
          </el-form-item>
          <el-form-item prop="collectTime" label="采集时间">
            {{resultFormData.collectTime}}
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../axios/api'
export default {  
  name: 'people',
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
        title: '添加试管',
        show: false,
        option: ''
      },
      addFormData: {
        tel: '',
        idcardType: '',
        idcard: '',
        name: ''
      },
      editDialog: {
        title: '编辑试管',
        show: false,
        option: ''
      },
      EditFormData: {
        tel: '',
        idcardType: '',
        idcard: '',
        name: ''
      },
      resultDialog: {
        title: '核酸结果',
        show: false,
        option: ''
      },
      resultFormData: {
        testtubeCode: '',
        testResult: '',
        testResult: ''
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
    // 获取人员列表
    getPeopleList() {
      let pages = {
        pageIndex: this.paginations.pageIndex,
        pageSize: this.paginations.pageSize
      }
      api.post('/people/getAllPeople.do',pages).then(res => {
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
    addOnSubmit() {
      api.post('/people/addPeople.do',this.addFormData).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          console.log(res)
          this.dialog.show = false
          this.addFormData = {}
          this.getPeopleList()
        }
      })
    },
    // 编辑
    handleEdit(index,row) {
      this.EditFormData = row
      this.editDialog.show = true
    },
    editOnSubmit() {
      api.post('/people/updatePeopleById.do',this.EditFormData).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          console.log(res)
          this.editDialog.show = false
        }
      })
    },
    // 删除
    handleDelete(index,row) {
      console.log(row.peopleId)
      if(confirm('确认删除？')) {
        api.post(`/people/deletePeopleById.do?peopleId=${row.peopleId}`).then(res => {
          if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
            console.log(res)
            this.getPeopleList()
          }
        }) 
      }
    },
    // 设置一页展示多少条数据
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize
      this.getPeopleList()
    },
    // 设置显示第几页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page
      this.getPeopleList()
    },
    // 查看核酸结果
    handleResult(index,row) {
      api.post(`/sample/getResultByPeopleId.do?peopleId=${row.peopleId}`).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          // console.log(res.data[0])
          this.resultFormData = res.data[0]
        }
      })
      this.resultDialog.show = true
    }
  },
  created() {
    this.getPeopleList()
  }
}
</script>

<style>
.people {
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