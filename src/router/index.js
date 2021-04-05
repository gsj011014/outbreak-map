import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  // 	path: '/',
  // 	redirect: '/home' //重定向到/home
  // },
  {
    path: '/home',
    name: 'Home',
    component: Home
	// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash',
  linkActiveClass: 'active'
})

export default router
