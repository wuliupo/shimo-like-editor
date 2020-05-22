import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/desktop',
  name: 'Desktop',
  component: () => import ('../views/Desktop.vue')
}, {
  path: '/docs/:id',
  name: 'Docs',
  component: () => import ('../views/Docs.vue')
}]

const router = new VueRouter({
  routes
})

export default router