<template>
  <div id="docs">
    <div class="ql-header">
      <div id="toolbar">
        <span class="ql-formats">
          <select class="ql-font">
            <option selected></option>
            <option value="serif"></option>
            <option value="monospace"></option>
          </select>
          <select class="ql-size">
            <option value="small"></option>
            <option selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
        </span>
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <button class="ql-strike"></button>
          <button class="ql-blockquote"></button>
          <button class="ql-code-block"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-script" value="sub"></button>
          <button class="ql-script" value="super"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-link"></button>
          <button class="ql-image"></button>
        </span>
      </div>
    </div>
    <div id="editor">
      <div class="ql-title">
        <div class="ql-title-box">
          <input type="" name="" v-model="docs.name" @blur="onNameBlur" placeholder="无标题">
        </div>
      </div>
      <quill-editor :content="content" :options="editorOption" ref="docEditor"/>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import { getContent, getDocs, updateDocs, composeContent } from '@/api'

export default {
  name: 'App',
  components: {
    quillEditor
  },
  data() {
    return {
      content: '',
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: {
            container: '#toolbar',
          },
        },
        placeholder: '',
      },
      docs: {},
      stack: [],
      holding: false,
    }
  },
  computed: {
    editor() {
      return this.$refs.docEditor.quill
    }
  },
  methods: {
    onTextChange(delta) {
      this.stack.push(delta);
      if (!this.holding) {
        this.holding = true;
        composeContent(this.docs.contentId, this.getDelta()).then(() => {
          setTimeout(() => {
            this.holding = false;
          }, 200);
        });
      }
    },
    getDelta() {
      const stacks = this.stack.reduce((existingDelta, currentDelta) => existingDelta.compose(currentDelta));
      this.stack = [];
      return stacks;
    },
    onNameBlur(e) {
      updateDocs(this.docs.id, {
        name: e.target.value
      });
    },
  },
  mounted() {
    getDocs(this.$route.params.id).then(docs => {
      this.docs = docs.data;
      getContent(this.docs.contentId).then(content => {
        this.editor.updateContents(content.data);
        this.editor.on('text-change', this.onTextChange);
      })
    });
  }
}
</script>

<style>
#editor {
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, "Apple Color Emoji", Helvetica, Tahoma, Arial, "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", sans-serif;
  -webkit-font-smoothing: antialiased;
  height: auto !important;
  background: #fff;
  box-shadow: 0 1px 5px #ddd;
  width: 816px;
  margin: auto;
}
.ql-title-box {
  box-sizing: content-box;
  margin: 0 100px;
  width: auto;
  font-size: 22.5pt;
  height: 60px;
  padding-top: 90px;
  border-bottom: 1px solid #e8ecf1;
  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Helvetica, Tahoma, Arial, 'Hiragino Sans GB', 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', sans-serif;
}
.ql-formats {
  text-align: left;
}
.ql-toolbar.ql-snow {
  background-color: #f7f7f7;
  height: 46px;
  padding: 0;
  padding-bottom: 8px;
  padding-top: 11px;
  white-space: nowrap;
  border: none;
  margin: 0 auto;
  text-align: center;
  font-family: Helvetica, Tahoma, Arial, Hiragino Sans GB, Microsoft YaHei, sans-serif;
  transition: height 0.2s ease-in;
}
.ql-title-box input {
  outline: none;
  border: none;
  box-shadow: none;
  display: block;
  width: 100%;
  height: 50px;
  font-size: 100%;
  line-height: 50px;
  color: #333;
  font-weight: bold;
  background: transparent;
}
.ql-container.ql-snow {
  border: none;
}
.ql-editor {
  box-sizing: border-box;
  height: 100%;
  tab-size: 4;
  -moz-tab-size: 4;
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  counter-reset: chapter section subsec;
  position: relative;
  padding: 10px 100px;
  font-size: 11pt;
  line-height: 1.7;
  color: #494949;
  outline: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 1000px;

}
</style>
