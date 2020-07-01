<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">

    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input v-model="form.content" type="textarea" row="3" />
    </el-form-item>
    <el-form-item label="链接地址" prop="link_url">
      <el-input v-model="form.link_url" />
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="formSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  components: {
  },
  props: {
    oneInfo: Object
  },
  data() {
    return {
      formLabelWidth: '80px',
      form: {
        banner_key: '',
        banner_link: '',
        sort_value: ''
      },
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        content: [{ required: true, trigger: 'blur', message: '请输入内容' }],
        link_url: [{ required: true, trigger: 'blur', message: '链接地址' }]
      }
    }
  },
  watch: {
    oneInfo(newValue) {
      if (newValue !== null) {
        this.form = newValue
      } else {
        this.clearForm()
      }
    }
  },
  mounted() {
    if (this.oneInfo) {
      this.form = this.oneInfo
    }
  },
  methods: {
    formSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return

        console.log(this.form)
        this.$emit('submit', this.form)
        // this.addStore()
      })
    },

    clearForm() {
      this.form = {
        banner_key: '',
        banner_link: '',
        sort_value: ''
      }
    },
    cancel() {
      this.clearForm()
      this.$emit('cancel')
    }
  }
}
</script>
<style>
</style>
