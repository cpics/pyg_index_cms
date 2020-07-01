<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item label="案例企业" prop="company_name">
      <el-input v-model="form.company_name" />
    </el-form-item>
    <el-form-item label="企业介绍" prop="company_content">
      <el-input v-model="form.company_content" />
    </el-form-item>

    <el-form-item label="企业LOGO" prop="banner_key">
      <image-uploader v-model="form.icon_image_key" size="182 x 110" />
    </el-form-item>
    <el-form-item label="大图" prop="banner_key">
      <image-uploader v-model="form.image_key" size="680 × 468" />
    </el-form-item>
    <el-form-item label="排序" prop="sort_value">
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
        company_name: '',
        company_content: '',
        icon_image_key: '',
        image_key: '',
        sort_value: ''
      },
      rules: {
        company_name: [{ required: true, trigger: 'blur', message: '请输入企业名称' }],
        company_content: [{ required: true, trigger: 'blur', message: '请输入企业介绍' }],
        icon: [{ required: true, trigger: 'blur', message: '请上传小图' }],
        company_image: [{ required: true, trigger: 'blur', message: '请上传大图' }],
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
        company_name: '',
        company_content: '',
        icon_image_key: '',
        image_key: ''
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
