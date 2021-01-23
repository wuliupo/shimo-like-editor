<template>
    <div class="desktop">
        <div class="desktop-title">
            我的桌面
        </div>
        <div
            v-for="(file, index) in files"
            :key="index"
            class="docs-item-wrapper"
        >
            <router-link
                :title="file.name || ''"
                class="docs-item"
                :to="{ name: 'Docs', params: { id: file.id } }"
            >
                <img
                    src="../assets/images/doc.png"
                    style="width: 80px; height: 80px;"
                >
                <div class="docs-item-name">
                    {{ file.name || '无标题' }}
                </div>
            </router-link>
        </div>
        <button
            class="btn-new"
            @click="newDoc"
        >
            新建
        </button>
    </div>
</template>
<script>
import { getDesktop, createDoc } from '@/api';

export default {
    name: 'Desktop',
    data: () => ({
        files: [],
    }),
    created() {
        getDesktop().then((resp) => {
            this.files = resp.data;
        });
    },
    methods: {
        newDoc() {
            createDoc().then((resp) => {
                this.$router.push(`/docs/${resp.data}`);
            });
        },
    },
};
</script>
<style src="../assets/css/desktop.css"></style>
