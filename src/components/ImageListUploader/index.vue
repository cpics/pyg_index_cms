<template>
  <div>
    <el-upload :action="updateUserImg" accept="image/jpeg,image/gif,image/png" list-type="picture-card" :file-list="fList" :headers="{Authorization:Authorization}" name="file" :on-success="handleUploadSuccess" :on-error="handleUploadError" :on-remove="handleRemove">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <image-tip v-if="size" :content="`图片尺寸：${size}`" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  props: {
    defaultImgs: [Array, String],
    size: String
  },

  data() {
    return {
      Authorization: `Token token=${getToken()},username=fengchao`,
      dialogImageUrl: '',
      dialogVisible: false,
      updateUserImg: 'https://windnest.pgyspace.com/api/v1/mains/upload_image',
      fList: []
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },

  watch: {
    defaultImgs: {
      immediate: true,
      handler(val) {
        console.log(val)
        const imgList = val || []
        this.fList = imgList.map(m => ({
          name: m,
          url: m
        }))
      }
    }
  },
  methods: {
    handleUploadSuccess(res, file, fileList) {
      console.log(fileList)

      const fileArray = fileList.map(item => {
        return item.response ? item.response.file_url : item.url
      })
      this.fList = fileList
      console.log(fileArray)
      this.$emit('imgChange', fileArray)
    },

    handleUploadError() {
      this.loading = false
      this.$message.error('上传异常！')
    },

    beforeUpload(file) {
      const isLt6M = file.size / 1024 / 1024 < 6

      if (!isLt6M) {
        this.$message.error('图片大小不能超过 6MB!')
        return false
      }
      this.loading = true
      return true
    },

    handleRemove(file, fileList) {
      const fileArray = fileList.map(item => {
        return item.response ? item.response.file_url : item.url
      })
      console.log(fileArray)
      this.$emit('imgChange', fileArray)
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .el-upload-list__item {
  transition: none !important;
}
</style>
