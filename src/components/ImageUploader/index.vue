<template>
  <div>
    <el-upload v-loading="loading" class="avatar-uploader" :action="updateUserImg" name="file" :headers="{Authorization:Authorization}" :show-file-list="false" :on-success="handleUploadSuccess" :on-error="handleUploadError" :before-upload="beforeUpload" accept="image/jpeg,image/gif,image/png">
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <image-tip v-if="size" :content="`图片尺寸：${size}`" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { updateUserImg } from '@/api/common'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      Authorization: `Token token=${getToken()},username=fengchao`,
      loading: false,
      updateUserImg: 'https://windnest.pgyspace.com/api/v1/mains/upload_image'
      // updateUserImg: updateUserImg
    }
  },

  computed: {
    ...mapGetters([
      'token'
    ])
  },

  props: {
    value: {},
    size: String
  },

  methods: {
    beforeUpload(file) {
      //   const isJPG = file.type === "image/jpeg";
      //   const isGIF = file.type === "image/gif";
      const isLt4M = file.size / 1024 / 1024 < 6

      //   if (!(isGIF || isJPG)) {
      //     this.$message.error("上传照片类型需为JPG、GIF格式!");
      //   }
      if (!isLt4M) {
        this.$message.error('图片大小不能超过 6MB!')
        return false
      }
      this.loading = true
      return true
    },

    handleUploadSuccess(res) {
      this.loading = false
      this.$emit('input', res.file_url)
      this.$message.success('上传成功!')
      // console.log(res)
      // if (res.code === 200) {
      //   this.$emit('input', res.data.docs[0].url)
      //   this.$message.success('上传成功!')
      // } else {
      //   this.$message.error(res.msg)
      // }
    },
    handleUploadError() {
      this.loading = false
      this.$message.error('上传异常！')
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader {
  display: inline-block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.upload-txt {
  font-size: 14px;
  padding-top: 4px;
}
</style>
