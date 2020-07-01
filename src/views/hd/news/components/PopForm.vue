<template>
  <el-form ref="form" :model="form" :rules="rules" :label-width="formLabelWidth">
    <el-form-item label="新闻类型" prop="new_type">
      <el-select v-model="form.new_type">
        <el-option v-for="(item, index) in newsTypeArray" :key="index" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="标签" prop="tag">
      <el-input v-model="form.tag" />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <mei-editor v-model="form.content" />
    </el-form-item>
    <el-form-item label="简略图" prop="brief_image">
      <image-uploader v-model="form.brief_image" size="280 x 140" />
    </el-form-item>
    <el-form-item label="作者" prop="author_name">
      <el-select v-model="form.author_name" @change="authorChange">
        <el-option v-for="(item, index) in authors" :key="index" :label="item.author_name" :value="item.author_name" />
      </el-select>
    </el-form-item>
    <el-form-item label="省份" prop="province">
      <el-select v-model="form.province">
        <el-option v-for="(item, index) in province" :key="index" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="发布时间" prop="publish_date">
      <el-date-picker v-model="form.publish_date" type="date" placeholder="选择日期" />
    </el-form-item>
    <el-form-item label="浏览量" prop="pv">
      <el-input v-model="form.pv" />
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="formSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import MeiEditor from '@/components/MeiEditor'
import ImageUploader from '@/components/ImageUploader'
import { FetchAuthors } from '@/api/news'
export default {
  components: {
    ImageUploader,
    MeiEditor
  },
  props: {
    oneInfo: Object
  },
  data() {
    return {
      formLabelWidth: '80px',
      province: ['全国', '江苏', '安徽', '山东', '陕西', '上海', '浙江', '深圳', '湖北'],
      authors: [],
      newsTypeArray: [{ label: '资讯', value: 1 }, { label: '热门', value: 2 }, { label: '专访', value: 3 }],
      form: {
        new_type: '', // 1.2.3
        title: '',
        tag: '',
        content: '',
        brief_image: '',
        author_name: '',
        author_avatar: '',
        author_qrcode: '',
        province: '',
        publish_date: '',
        pv: ''
      },
      rules: {
        new_type: [{ required: true, trigger: 'blur', message: '请选择新闻类型' }],
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        tag: [{ required: true, trigger: 'blur', message: '请输入标签' }],
        content: [{ required: true, trigger: 'blur', message: '请输入内容' }],
        brief_image: [{ required: true, trigger: 'blur', message: '请选择简略图' }],
        author_name: [{ required: true, trigger: 'blur', message: '请选择作者' }],
        province: [{ required: true, trigger: 'blur', message: '请选择省份' }],
        publish_date: [{ required: true, trigger: 'blur', message: '请选择发布时间' }],
        pv: [{ required: true, trigger: 'blur', message: '请输入浏览量' }]
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
    this.fetchAuthors()
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
    authorChange(val) {
      this.authors.forEach(item => {
        if (item.author_name === val) {
          this.form.author_avatar = item.author_avatar
          this.author_qrcode = item.author_qrcode
        }
      })
    },
    async fetchAuthors() {
      const res = await FetchAuthors()
      this.authors = res.authors
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
