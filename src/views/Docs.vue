<template>
    <div class="docs-container">
        <div
            :id="toolbar"
            class="ql-header"
        >
            <span class="ql-formats">
                <select class="ql-font">
                    <option selected />
                    <option value="serif" />
                    <option value="monospace" />
                </select>
                <select class="ql-size">
                    <option value="small" />
                    <option selected />
                    <option value="large" />
                    <option value="huge" />
                </select>
            </span>
            <span class="ql-formats">
                <button class="ql-bold" />
                <button class="ql-italic" />
                <button class="ql-underline" />
                <button class="ql-strike" />
                <button class="ql-blockquote" />
                <button class="ql-code-block" />
            </span>
            <span class="ql-formats">
                <button
                    class="ql-list"
                    value="ordered"
                />
                <button
                    class="ql-list"
                    value="bullet"
                />
            </span>
            <span class="ql-formats">
                <button
                    class="ql-script"
                    value="sub"
                />
                <button
                    class="ql-script"
                    value="super"
                />
            </span>
            <span class="ql-formats">
                <button class="ql-link" />
                <button class="ql-image" />
            </span>
        </div>
        <div class="editor-container">
            <div class="ql-title">
                <div class="ql-title-box">
                    <input
                        v-model="docs.name"
                        type=""
                        name=""
                        placeholder="无标题"
                        @blur="onNameBlur"
                    >
                </div>
            </div>
            <quill-editor
                ref="docEditor"
                :options="editorOption"
            />
        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor, Quill } from 'vue-quill-editor';

import {
    getContent, getDocs, updateDocs, composeContent,
} from '@/api';

const Delta = Quill.import('delta');

export default {
    name: 'Docs',
    components: {
        quillEditor,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        const toolbar = `toolbar${Date.now()}`;
        return {
            content: null,
            es: null,
            toolbar,
            editorOption: {
                theme: 'snow',
                // theme: 'bubble',
                modules: {
                    toolbar: {
                        container: `#${toolbar}`,
                    },
                },
                placeholder: '',
            },
            docs: {},
            change: new Delta(),
            clientId: Date.now(),
        };
    },
    computed: {
        editor() {
            return this.$refs.docEditor.quill;
        },
    },
    created() {
        getDocs(this.id).then((docs) => {
            this.docs = docs.data;
            getContent(this.id).then((content) => {
                this.content = new Delta(content.data);
                this.editor.setContents(this.content, 'init');
                this.editor.on('text-change', this.onTextChange);
                this.syncDoc();
                this.compose();
            });
        });
    },
    destroyed() {
        if (this.es) {
            this.es.removeEventListener(this.id, null);
        }
    },
    methods: {
        onTextChange(delta, oldDelta, source) {
            if (source === 'sync') {
                return;
            }
            this.change = this.change.compose(delta);
        },
        onNameBlur(e) {
            updateDocs(this.id, {
                name: e.target.value,
            });
        },
        syncDoc() {
            // 使用 EventSource 实现页面消息推送 https://cloud.tencent.com/developer/article/1397238
            this.es = new EventSource(`/api/pull/${this.id}?clientId=${this.clientId}`);
            this.es.addEventListener(this.id, (event) => {
                const data = JSON.parse(event.data);
                console.log(data.body);
                if (data.name) {
                    this.docs.name = data.name;
                } else if (data.clientId !== this.clientId) {
                    this.editor.updateContents(data.body, 'sync');
                }
            }, false);
        },
        compose() {
            setInterval(() => {
                if (this.change.length() > 0) {
                    composeContent(this.id, {
                        body: this.change,
                        clientId: this.clientId,
                    });
                    this.change = new Delta();
                }
            }, 1000);
        },
    },
};
</script>

<style lang="less" src="../assets/css/docs.less"></style>
