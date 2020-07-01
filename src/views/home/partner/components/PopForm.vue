<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item label="合作伙伴图片" prop="image_key">
      <image-uploader v-model="form.image_key" size="220 x 128" />
    </el-form-item>
    <el-form-item label="链接" prop="image_link">
      <el-input v-model="form.image_link" />
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
        image_url: '',
        image_link: '',
        sort_value: ''
      },
      rules: {
        image_url: [{ required: true, trigger: 'blur', message: '请上传图片' }],
        sort_value: [{ required: true, trigger: 'blur', message: '请输入排序' }]
        // image_link: [{ required: true, trigger: 'blur', message: '请输入链接' }]
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
        image_url: '',
        image_link: ''
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
