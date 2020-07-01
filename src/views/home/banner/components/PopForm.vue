<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">

    <el-form-item label="图片" prop="banner_key">
      <image-uploader v-model="form.banner_key" size="1920 x 654" />
    </el-form-item>
    <el-form-item label="链接" prop="banner_link">
      <el-input v-model="form.banner_link" />
    </el-form-item>
    <el-form-item label="排序" prop="banner_link">
      <el-input v-model="form.sort_value" />
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="formSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ImageUploader from '@/components/ImageUploader'
export default {
  components: {
    ImageUploader
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
        banner_key: [{ required: true, trigger: 'blur', message: '请选择图片' }],
        banner_link: [{ required: true, trigger: 'blur', message: '请输入链接' }],
        sort_value: [{ required: true, trigger: 'blur', message: '请输入排序' }]
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
