import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import '@/assets/css/global.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
