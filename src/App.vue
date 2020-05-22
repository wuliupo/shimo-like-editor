<template>
  <div id="app">
    <header class="header">
      <span class="header-title">在线文档</span>
    </header>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 50px;
  overflow: hidden;
  background-color: #ffffff;
  flex-shrink: 0;
  flex-direction: row;
  align-items: stretch;
  z-index: 110;
  box-shadow: 0 2px 3px 0 rgba(100,100,100,0.06);
  border-bottom: 1px solid #fff;
}
.header-title {
  margin: 15px;
}
.main {
  margin-top: 50px;
}
</style>
