<template>
  <div>
    <quill-editor ref="myQuillEditor" v-model="content" close-on-press-escape="false" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)" />
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import { container, QuillWatch } from 'quill-image-extend-module'

import { getToken } from '@/utils/auth'

export default {
  components: {
    quillEditor
  },
  props: {
    value: String
  },
  data() {
    return {
      content: '',
      editorOption: {
        modules: {
          ImageResize: {},
          ImageExtend: {
            loading: true,
            headers: (xhr) => {
              xhr.setRequestHeader('Authorization', `Token token=${getToken()},username=fengchao`)
            },
            name: 'file',
            action: 'https://windnest.pgyspace.com/api/v1/mains/upload_image',
            response: (res) => {
              return res.file_url
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function() {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  watch: {
    value(newValue) {
      this.content = newValue
    }
  },
  mounted() {
    this.content = this.value
  },
  methods: {
    onEditorBlur() {

    },
    onEditorFocus() {

    },
    onEditorChange($event) {
      // console.log($event)
      this.$emit('input', $event.html)
    }
  }
}
</script>

<style>
.ql-editor {
    height: 200px;
}
</style>
