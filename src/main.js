import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import routes from './router';
import 'normalize.css';
import '@/assets/css/global.less';

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes,
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
