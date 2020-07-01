<template>
  <div class="app-container">
    <el-table :data="list">
      <el-table-column name="申请人" prop="apply_name" />
      <el-table-column name="联系电话" prop="apply_phone" />
      <el-table-column name="领域" prop="area" />
      <el-table-column name="行业" prop="industry" />
      <!-- <el-table-column name="申请时间" prop="created_at" /> -->
      <el-table-column name="融资金额" prop="finance_amount" />
      <el-table-column name="当前阶段" prop="current_stage" />
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.$index)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-if="dialogFormVisible" title="详情" :close-on-press-escape="false" :close-on-click-modal="false" :visible="dialogFormVisible" @close="close">
      <el-form>
        <el-form-item label="项目名称">
          {{ oneInfo.project_name }}
        </el-form-item>
        <el-form-item label="行业分类">
          领域：{{ oneInfo.area }}，行业：{{ oneInfo.industry }}
        </el-form-item>
        <el-form-item label="目前所处阶段">
          {{ oneInfo.current_stage }}
        </el-form-item>
        <el-form-item label="项目介绍">
          {{ oneInfo.project_desc }}
        </el-form-item>
        <el-form-item label="融资金额">
          {{ oneInfo.finance_amount }}
        </el-form-item>
        <el-form-item label="出让比例">
          {{ oneInfo.sell_propor }}
        </el-form-item>
        <el-form-item label="申请人">
          {{ oneInfo.apply_name }}
        </el-form-item>
        <el-form-item label="联系方式">
          {{ oneInfo.apply_phone }}
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { FetchFinances } from '@/api/apply'
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
      const res = await FetchFinances()
      this.list = res.apply_finances
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
