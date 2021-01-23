<template>
    <div class="app-container">
        <header class="header">
            <router-link
                class="header-title"
                :to="{ name: 'Desktop' }"
            >
                在线文档
            </router-link>
        </header>
        <router-view class="main" />
    </div>
</template>

<style src="./assets/css/app.css"></style>
