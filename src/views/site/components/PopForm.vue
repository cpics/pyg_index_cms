<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item label="站点名称" prop="site_name">
      <el-input v-model="form.site_name" />
    </el-form-item>
    <el-form-item label="站点省份" prop="site_province">
      <el-select v-model="form.site_province">
        <el-option v-for="(item, index) in province" :key="index" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="站点地址" prop="address">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="背景图" prop="index_image_key">
      <image-uploader v-model="form.index_image_key" size="826 x 440" />
    </el-form-item>
    <el-form-item label="联系人" prop="contact_name">
      <el-input v-model="form.contact_name" />
    </el-form-item>
    <el-form-item label="联系电话" prop="contact_phone">
      <el-input v-model="form.contact_phone" maxlength="11" />
    </el-form-item>
    <el-form-item label="月租" prop="month_rent">
      <el-input v-model="form.month_rent" />
    </el-form-item>
    <el-form-item label="基本介绍" prop="introduction">
      <el-input v-model="form.introduction" type="textarea" :rows="5" />
    </el-form-item>
    <el-form-item label="关注领域" prop="focus_area">
      <el-input v-model="form.focus_area" type="textarea" :rows="5" />
    </el-form-item>
    <el-form-item label="孵化结果" prop="incubation_results">
      <el-input v-model="form.incubation_results" type="textarea" :rows="5" />
    </el-form-item>
    <el-form-item label="场地展示" prop="images">
      <image-list-uploader :default-imgs="form.images" size="826 x 540" @imgChange="detailImgsChange" />
      <!-- <el-input v-model="form.support_services" type="textarea" :rows="5" /> -->
    </el-form-item>
    <el-form-item label="支持服务" prop="support_services">
      <el-input v-model="form.support_services" type="textarea" :rows="5" />
    </el-form-item>
    <el-form-item label="站点地址图片" prop="address_image_key">
      <image-uploader v-model="form.address_image_key" size="826 x 440" />
    </el-form-item>
    <el-form-item label="跳转链接" prop="address_link">
      <el-input v-model="form.address_link" />
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="formSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ImageUploader from '@/components/ImageUploader'
import ImageListUploader from '@/components/ImageListUploader'
export default {
  components: {
    ImageUploader,
    ImageListUploader
  },
  props: {
    oneInfo: Object
  },
  data() {
    return {
      formLabelWidth: '110px',
      province: ['江苏', '安徽', '山东', '陕西', '上海', '浙江', '深圳', '湖北'],
      form: {
        site_name: '',
        site_province: '',
        address: '',
        contact_name: '',
        contact_phone: '',
        month_rent: '',
        introduction: '',
        focus_area: '',
        incubation_results: '',
        support_services: '',
        index_image_key: '',
        address_image_key: '',
        images: '',
        address_link: ''
      },
      rules: {
        site_name: [{ required: true, trigger: 'blur', message: '请输入站点名称' }],
        site_province: [{ required: true, trigger: 'blur', message: '请选择省份' }],
        address: [{ required: true, trigger: 'blur', message: '请输入站点地址' }],
        contact_name: [{ required: true, trigger: 'blur', message: '请输入联系人' }],
        contact_phone: [{ required: true, trigger: 'blur', message: '请输入联系电话' }],
        month_rent: [{ required: true, trigger: 'blur', message: '请输入月租' }],
        introduction: [{ required: true, trigger: 'blur', message: '请输入基本介绍' }],
        focus_area: [{ required: true, trigger: 'blur', message: '请输入关注领域' }],
        incubation_results: [{ required: true, trigger: 'blur', message: '请输入孵化结果' }],
        support_services: [{ required: true, trigger: 'blur', message: '请输入支持服务' }],
        index_image_key: [{ required: true, trigger: 'blur', message: '请上传站点背景图' }],
        address_image_key: [{ required: true, trigger: 'blur', message: '请上传地址图片' }],
        images: [{ required: true, trigger: 'blur', message: '请上传图片' }],
        address_link: [{ required: true, trigger: 'blur', message: '请输入跳转链接' }]
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
    detailImgsChange(imgs) {
      this.form.images = imgs
    },
    clearForm() {
      this.form = {
        site_name: '',
        address: '',
        contact_name: '',
        contact_phone: '',
        month_rent: '',
        introduction: '',
        focus_area: '',
        incubation_results: '',
        support_services: '',
        index_image_key: '',
        address_image_key: ''
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
