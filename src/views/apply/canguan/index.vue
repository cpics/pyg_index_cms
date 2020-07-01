<template>
  <div class="app-container">
    <el-table :data="list">
      <el-table-column name="站点省份" prop="site_province" />
      <el-table-column name="站点" prop="site_name" />
      <el-table-column name="申请人" prop="apply_name" />
      <el-table-column name="联系电话" prop="apply_phone" />
      <el-table-column name="联系邮箱" prop="apply_email" />
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.$index)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-if="dialogFormVisible" title="详情" :close-on-press-escape="false" :close-on-click-modal="false" :visible="dialogFormVisible" @close="close">
      <el-form>
        <el-form-item label="省份">
          {{ oneInfo.site_province }}
        </el-form-item>
        <el-form-item label="站点">
          {{ oneInfo.site_name }}
        </el-form-item>
        <el-form-item label="预约时间">
          {{ oneInfo.visit_date }}
        </el-form-item>
        <el-form-item label="申请人">
          {{ oneInfo.apply_name }}
        </el-form-item>
        <el-form-item label="单位名称">
          {{ oneInfo.unit_name }}
        </el-form-item>
        <el-form-item label="联系方式">
          {{ oneInfo.apply_phone }}
        </el-form-item>
        <el-form-item label="联系邮箱">
          {{ oneInfo.apply_email }}
        </el-form-item>
        <el-form-item label="参观目的">
          {{ oneInfo.visit_purpose }}
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { FetchVisits } from '@/api/apply'
export default {
  data() {
    return {
      dialogFormVisible: false,
      list: [],
      oneInfo: {}
    }
  },
  created() {
    this.fetchFinances()
  },
  methods: {
    async fetchFinances() {
      const res = await FetchVisits()
      this.list = res.apply_visits
    },
    showDetail(index) {
      this.oneInfo = this.list[index]
      this.dialogFormVisible = true
    },
    close() {
      this.dialogFormVisible = false
    }
  }
}
</script>

<style>
</style>
