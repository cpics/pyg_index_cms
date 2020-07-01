<template>
  <el-alert
    style="margin-bottom:12px"
    :title="content"
    type="error"
    :closable="false"
  />
</template>

<script>
export default {
  props: {
    content: {}
  },

  data() {
    return {

    }
  },

  created() {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
