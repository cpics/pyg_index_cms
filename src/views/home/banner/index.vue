<template>
  <div class="app-container">
    <el-button type="primary" @click="showAdd">
      添加{{ name }}
    </el-button>
    <el-table :data="list">
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.banner_key" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column label="链接" prop="banner_link" />
      <el-table-column label="排序" prop="sort_value" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="primary" style="margin-right:10px" @click="showUpdate(scope.$index)">
            修改
          </el-button>
          <el-popconfirm :title="`确定删除这一条${name}？`" @onConfirm="del(scope.row.id,scope.$index)">
            <el-button slot="reference" class="warning">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-if="dialogFormVisible" :title="`${dialogFormType === 1?'添加':'新增'}${name}`" :close-on-press-escape="false" :close-on-click-modal="false" :visible="dialogFormVisible" @close="close">
      <pop-form :one-info="oneInfo" @cancel="close" @submit="formSubmit" />
    </el-dialog>
  </div>
</template>

<script>
import { FetchList, Add, Update, Del } from '@/api/banner'

import PopForm from './components/PopForm'
export default {
  components: {
    PopForm
  },
  data() {
    return {
      name: 'banner',
      oneInfo: null,
      list: [],
      dialogFormType: 1,
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    close() {
      this.dialogFormVisible = false
      console.log(1)
    },
    formSubmit(form) {
      if (this.dialogFormType === 1) {
        this.add(form)
      } else {
        this.update(form)
      }
    },
    async fetchList() {
      const res = await FetchList()
      this.list = res.banners
    },
    async add(form) {
      await Add(form)
      this.$message.success('添加成功')
      this.close()
      this.fetchList()
    },
    async update(form) {
      await Update(this.oneInfo.id, form)
      this.$message.success('修改成功')
      this.close()
      this.fetchList()
    },
    async del(id, index) {
      await Del(id)
      this.$message.success('删除成功')
      this.list.splice(index, 1)
    },
    showAdd() {
      this.oneInfo = null
      this.dialogFormType = 1
      this.dialogFormVisible = true
    },
    showUpdate(index) {
      this.oneInfo = this.list[index]
      this.dialogFormType = 2
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss">
</style>
