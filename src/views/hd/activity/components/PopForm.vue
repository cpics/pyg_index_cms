<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item label="活动名称" prop="activity_name">
      <el-input v-model="form.activity_name" />
      <!-- <image-uploader v-model="form.activity_name" size="1920 x 654" /> -->
    </el-form-item>
    <el-form-item label="活动时间" prop="begin_date">
      <el-date-picker v-model="form.begin_date" type="date" placeholder="选择日期" />
    </el-form-item>
    <el-form-item label="活动主题" prop="subject">
      <el-input v-model="form.subject" />
    </el-form-item>
    <el-form-item label="招募人数" prop="recruit_count">
      <el-input v-model="form.recruit_count" />
    </el-form-item>
    <el-form-item label="活动人数" prop="activity_form">
      <el-input v-model="form.activity_form" />
    </el-form-item>
    <el-form-item label="费用" prop="amount">
      <el-input v-model="form.amount" />
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="封面图" prop="icon_image">
      <image-uploader v-model="form.icon_image" size="280 x 140" />
    </el-form-item>
    <el-form-item label="缩略图" prop="small_image">
      <image-uploader v-model="form.small_image" size="400 x 310" />
    </el-form-item>
    <el-form-item label="详情图" prop="detail_image">
      <image-uploader v-model="form.detail_image" size="690 x *" />
    </el-form-item>
    <el-form-item label="活动状态" prop="activity_status">
      <el-select v-model="form.activity_status">
        <el-option v-for="(item, index) in activitySatusArray" :key="index" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="活动链接" prop="enter_link">
      <el-input v-model="form.enter_link" />
    </el-form-item>
    <el-form-item label="活动图片" prop="enter_image">
      <image-uploader v-model="form.enter_image" size="150 x 150" />
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
      activitySatusArray: [{ label: '关闭', value: 0 }, { label: '进行中', value: 1 }],
      formLabelWidth: '80px',
      form: {
        activity_name: '',
        begin_date: '', // 活动时间
        subject: '',
        recruit_count: '', // 招募人数
        activity_form: '', // 活动形式
        amount: '', // 金额
        address: '', // 地址
        icon_image: '',
        small_image: '',
        detail_image: '',
        activity_status: '', // 状态 0 关闭1进行
        enter_link: '', // 活动链接
        enter_image: '' // 活动图片
      },
      rules: {
        activity_name: [{ required: true, trigger: 'blur', message: '请输入活动名称' }],
        begin_date: [{ required: true, trigger: 'blur', message: '请选择活动时间' }],
        subject: [{ required: true, trigger: 'blur', message: '请输入活动主题' }],
        recruit_count: [{ required: true, trigger: 'blur', message: '请输入招募人数' }],
        activity_form: [{ required: true, trigger: 'blur', message: '请输入活动形式' }],
        amount: [{ required: true, trigger: 'blur', message: '请输入活动费用' }],
        address: [{ required: true, trigger: 'blur', message: '请输入活动地址' }],
        icon_image: [{ required: true, trigger: 'blur', message: '请上传封面图' }],
        small_image: [{ required: true, trigger: 'blur', message: '请上传缩略图' }],
        detail_image: [{ required: true, trigger: 'blur', message: '请上传详情图' }],
        activity_status: [{ required: true, trigger: 'blur', message: '请选择活动状态' }]
        // enter_link: [{ required: true, trigger: 'blur', message: '请输入活动链接' }],
        // enter_image: [{ required: true, trigger: 'blur', message: '请上传活动图片' }]
        // banner_key: [{ required: true, trigger: 'blur', message: '请选择图片' }],
        // banner_link: [{ required: true, trigger: 'blur', message: '请输入链接' }],
        // sort_value: [{ required: true, trigger: 'blur', message: '请输入排序' }]
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
