<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item label="站点名称" prop="site_name">
      <el-input v-model="form.site_name" />
    </el-form-item>
    <el-form-item label="产业方向" prop="industry_direction">
      <el-input v-model="form.industry_direction" />
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="背景图" prop="bg_image">
      <image-uploader v-model="form.bg_image" size="384 x 502" />
    </el-form-item>
    <el-form-item label="链接" prop="link_url">
      <el-input v-model="form.link_url" />
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
        site_name: '',
        industry_direction: '',
        address: '',
        bg_image: '',
        link_url: ''
      },
      rules: {
        site_name: [{ required: true, trigger: 'blur', message: '请输入站点名称' }],
        industry_direction: [{ required: true, trigger: 'blur', message: '请输入产业方向' }],
        address: [{ required: true, trigger: 'blur', message: '请输入地址' }],
        bg_image: [{ required: true, trigger: 'blur', message: '请上传背景图片' }],
        link_url: [{ required: true, trigger: 'blur', message: '请选择链接' }]
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
