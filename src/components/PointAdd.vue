<template>
  <div class="pointitem">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false">
      <div class="form">
        <el-form
          :model="formData"
          label-width="120px"
          style="margin:10px;width=auto">
          <el-form-item prop="pointNmae" label="检测站点名称">
            <el-input type="pointNmae" v-model="formData.pointName"></el-input>
          </el-form-item>
          <el-form-item  class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click='onSubmit()'>提  交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../axios/api'
export default {
  name: 'pointitem',
  props: ['dialog','formData'],
  methods: {
    onSubmit() {
      console.log(this.formData)
      const url = this.dialog.option == 'addPoint.do' ? 'addPoint.do' : `updatePoint.do`
      api.post(`/point/${url}`,this.formData).then(res => {
        if(res.code == this.$comm.RESULT_CODE.SUCCESS) {
          console.log(res)
          this.$emit('update')
          this.dialog.show = false
        }
      })
    },
  }
}
</script>

<style>

</style>