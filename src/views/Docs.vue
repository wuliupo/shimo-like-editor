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
      <quill-editor :options="editorOption" ref="docEditor"/>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor, Quill } from 'vue-quill-editor'
const Delta = Quill.import('delta');

import { getContent, getDocs, updateDocs, composeContent } from '@/api'

export default {
  name: 'App',
  components: {
    quillEditor
  },
  data() {
    return {
      content: null,
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
      change: new Delta(),
      clientId: new Date().valueOf(),
    }
  },
  computed: {
    editor() {
      return this.$refs.docEditor.quill
    }
  },
  methods: {
    onTextChange(delta, oldDelta, source) {
      if (source == 'sync') {
        return;
      }
      this.change = this.change.compose(delta);
    },
    onNameBlur(e) {
      updateDocs(this.docs.id, {
        name: e.target.value
      });
    },
    syncDoc() {
      let es = new EventSource(`/api/docs/${this.docs.id}/pull?clientId=${this.clientId}`);
      es.addEventListener(this.docs.id, event => {
        let data = JSON.parse(event.data);
        console.log(data.body);
        if (data.name) {
          this.docs.name = data.name;
        } else if (data.clientId != this.clientId) {
          this.editor.updateContents(data.body, 'sync');
        }
      }, false);
    },
    compose() {
      setInterval(() => {
        if (this.change.length() > 0) {
          composeContent(this.docs.id, {
            body: this.change,
            clientId: this.clientId,
          });
          this.change = new Delta();
        }
      }, 1000);
    },
  },
  mounted() {
    const docId = this.$route.params.id;
    getDocs(docId).then(docs => {
      this.docs = docs.data;
      getContent(docId).then(content => {
        this.content = new Delta(content.data);
        this.editor.setContents(this.content, 'init');
        this.syncDoc();
        this.compose();
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
